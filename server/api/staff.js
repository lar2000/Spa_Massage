const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('./db_connection');

const staff = express.Router();
// Define the fields in an array
const Fields = [
  'staff_name',
  'staff_surname',
  'email',
  'tell',
  'village',
  'district',
  'province',
  'state'
];
const insertFields = Fields.join(', ');
const SetClause = Fields.map(field => `${field} = ?`).join(', ');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads', 'profiles');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

staff.get('/staff', (req, res) => {
  db.query(
    `SELECT staff_id, ${Fields}, profile, tbl_district.district_name, tbl_province.province_name 
     FROM staff
     LEFT JOIN tbl_district ON staff.district=tbl_district.district_id 
     LEFT JOIN tbl_province ON staff.province=tbl_province.province_id 
     WHERE staff.state = 1`,
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    }
  );
});

staff.post('/staff', upload.single('profile'), (req, res) => {
  // Ensure 'state' defaults to 1 if not provided
  const values = Fields.map(field => {
    if (field === 'state') {
      return req.body[field] != null ? req.body[field] : 1;
    }
    return req.body[field];
  });

  const profile = req.file ? `uploads/profiles/${req.file.filename}` : null;

  function generateRandomStaffId() {
    const randomId = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `S-${randomId}`;
  }

  function insertStaff() {
    const staffId = generateRandomStaffId();
    // Dynamically construct the query using insertFields
    const query = `INSERT INTO staff (staff_id, ${insertFields}, profile) 
                   VALUES (?, ${Fields.map(() => '?').join(', ')}, ?)`;
    
    db.query(query, [staffId, ...values, profile], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: staffId, ...req.body, profile });
    });
  }

  insertStaff();
});

staff.put('/staff/:id', upload.single('profile'), (req, res) => {
  // Handle state defaulting to 1 if null or undefined
  const values = Fields.map(field => {
    if (field === 'state') {
      return req.body[field] != null ? req.body[field] : 1; // Default to 1 if null or undefined
    }
    return req.body[field];
  });

  const profile = req.file ? `uploads/profiles/${req.file.filename}` : null;

  let query = `UPDATE staff SET ${SetClause}`;
  const queryParams = [...values];

  if (profile) {
    query += `, profile = ?`;
    queryParams.push(profile);
  }

  query += ` WHERE staff_id = ?`;
  queryParams.push(req.params.id);

  db.query(query, queryParams, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ id: req.params.id, ...req.body, profile });
  });
});

staff.delete('/staff/:id', (req, res) => {
  db.query('UPDATE staff SET state = 0 WHERE staff_id = ?', [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).end();
  });
});

module.exports = staff;
