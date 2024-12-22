const express = require('express');
const db = require('./db_connection')
const customer = express.Router();

  customer.get('/customers', (req, res) => {
    db.query('SELECT * FROM customer', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });
  // POST---->>ບັນ ທືກ ຂໍ້ມູນ
  customer.post('/customers', (req, res) => {
    const {cust_id, cust_name, cust_surname, village, district, province } = req.body;
    console.log("Received new customer:", {cust_id, cust_name, cust_surname, village, district, province }); 
    
    const query = 'INSERT INTO customer (cust_id, cust_name, cust_surname, village, district, province) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [cust_id, cust_name, cust_surname, village, district, province], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: result.insertId, cust_id, cust_name, cust_surname, village, district, province });
    });
  });
  
//-----PUT ----ແກ້ ໄຂ <--> ອັບ ເດດ ຂໍ້ມູນ
  customer.put('/customers/:id', (req, res) => {
    const { cust_id, cust_name, cust_surname, village, district, province } = req.body;
    const query = 'UPDATE customer SET cust_id= ?, cust_name= ?, cust_surname= ?, village= ?, district= ?, province = ? WHERE cust_id = ?';
    db.query(query, [cust_id, cust_name, cust_surname, village, district, province, req.params.id], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ id: req.params.id, cust_id, cust_name, cust_surname, village, district, province });
    });
  });
  
  customer.delete('/customers/:id', (req, res) => {
    db.query('DELETE FROM customer WHERE cust_id = ?', [req.params.id], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(204).end();
    });
  });

  module.exports = customer;