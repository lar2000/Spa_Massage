const express = require('express');
const db = require('./db_connection');
const country = express.Router();

// CRUD Routes
country.get('/provinces', (req, res) => {
    db.query('SELECT * FROM tbl_province', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });
  country.get('/district/:province_id', (req, res) => {
    const provinceId = req.params.province_id;
    db.query('SELECT * FROM tbl_district WHERE province_id_fk = ?', [provinceId],(err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });

  // province.post('/provinces', (req, res) => {
  //   const { name, description } = req.body;
  //   console.log("Received new province:", { name, description }); 
    
  //   const query = 'INSERT INTO gan (name, description) VALUES (?, ?)';
  //   db.query(query, [name, description], (err, result) => {
  //     if (err) {
  //       return res.status(500).json({ error: err.message });
  //     }
  //     res.status(201).json({ id: result.insertId, name, description });
  //   });
  // });
  
  // province.put('/provinces/:id', (req, res) => {
  //   const { name, description } = req.body;
  //   const query = 'UPDATE gan SET name = ?, description = ? WHERE id = ?';
  //   db.query(query, [name, description, req.params.id], (err) => {
  //     if (err) {
  //       return res.status(500).json({ error: err.message });
  //     }
  //     res.status(200).json({ id: req.params.id, name, description });
  //   });
  // });
  
  // province.delete('/provinces/:id', (req, res) => {
  //   db.query('DELETE FROM gan WHERE id = ?', [req.params.id], (err) => {
  //     if (err) {
  //       return res.status(500).json({ error: err.message });
  //     }
  //     res.status(204).end();
  //   });
  // });

  module.exports = country;
