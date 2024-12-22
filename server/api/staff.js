const express = require('express');
const db = require('./db_connection')
//const city = express.Router();
const staff = express.Router();
staff.get('/staff', (req, res) => {
  //db.query('SELECT * FROM staff',
  db.query(`SELECT staff_id, staff_name, service_id_fk, staff_surname, email, tell, village, province, district, service.service_name, tbl_district.district_name, tbl_province.province_name 
            FROM staff
            LEFT JOIN service ON staff.service_id_fk=service.service_id
            LEFT JOIN tbl_district ON staff.district=tbl_district.district_id 
            LEFT JOIN tbl_province ON staff.province=tbl_province.province_id`,
     (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

staff.post('/staff', (req, res) => {
  const {staff_id, service_id_fk, staff_name, staff_surname, email, tell, village, district, province } = req.body;
  console.log("Received new staff:", {staff_id, service_id_fk, staff_name, staff_surname, email, tell, village, district, province }); 
  
  const query = 'INSERT INTO staff (staff_id, service_id_fk, staff_name, staff_surname, email, tell, village, district, province) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [staff_id, service_id_fk, staff_name, staff_surname, email, tell, village, district, province], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, staff_id, service_id_fk, staff_name, staff_surname, email, tell, village, district, province });
  });
});

staff.put('/staff/:id', (req, res) => {
  const { staff_id, service_id_fk, staff_name, staff_surname, email, tell, village, district, province } = req.body;
  const query = 'UPDATE staff SET staff_id = ?, service_id_fk = ?, staff_name = ?, staff_surname = ?, email = ?, tell = ?, village = ?, district = ?, province = ? WHERE staff_id = ?';
  console.log("Upate new staff:", {staff_id, service_id_fk, staff_name, staff_surname, email, tell, village, district, province });
  db.query(query, [staff_id, service_id_fk, staff_name, staff_surname, email, tell, village, district, province, req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ id: req.params.id, staff_id, service_id_fk, staff_name, staff_surname, email, tell, village, district, province });
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