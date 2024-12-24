const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('./db_connection');

const staff = express.Router();
// Define the fields in an array
const staffFields = [
  'staff_id',
  'service_id_fk',
  'staff_name',
  'staff_surname',
  'email',
  'tell',
  'village',
  'district',
  'province'
];
const staffFieldsString = staffFields.join(', ');

const staffSetClause = staffFields.map(field => `${field} = ?`).join(', ');

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
    `SELECT ${staffFieldsString}, profile, service.service_name, tbl_district.district_name, tbl_province.province_name 
     FROM staff
     LEFT JOIN service ON staff.service_id_fk=service.service_id
     LEFT JOIN tbl_district ON staff.district=tbl_district.district_id 
     LEFT JOIN tbl_province ON staff.province=tbl_province.province_id`,
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    }
  );
});

// Add new staff
staff.post('/staff', upload.single('profile'), (req, res) => {
  const values = staffFields.map(field => req.body[field]);
  const profile = req.file ? `uploads/profiles/${req.file.filename}` : null;

  const query = `INSERT INTO staff (${staffFieldsString}, profile) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(query, [...values, profile], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, ...req.body, profile });
  });
});
staff.put('/staff/:id', upload.single('profile'), (req, res) => {
  const values = staffFields.map(field => req.body[field]);
  const profile = req.file ? `uploads/profiles/${req.file.filename}` : null;

  // Set up the base query
  let query = `UPDATE staff SET ${staffSetClause}`;
  const queryParams = [...values];

  // Only include profile in the query if it's not null
  if (profile) {
    query += `, profile = ?`;
    queryParams.push(profile);
  }

  query += ` WHERE staff_id = ?`;
  queryParams.push(req.params.id);

  // Execute the query
  db.query(query, queryParams, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ id: req.params.id, ...req.body, profile });
  });
});


staff.delete('/staff/:id', (req, res) => {
  db.query('DELETE FROM staff WHERE staff_id = ?', [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).end();
  });
});

module.exports = staff;
