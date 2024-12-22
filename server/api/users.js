const express = require('express');
const db = require('./db_connection')
const user = express.Router();

  user.get('/users', (req, res) => {
    db.query('SELECT * FROM tb_user', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });
  // POST---->>ບັນ ທືກ ຂໍ້ມູນ
  user.post('/users', (req, res) => {
    const {user_id, user_name, user_surname, village, district, province } = req.body;
    console.log("Received new user:", {user_id, user_name, user_surname, village, district, province }); 
    
    const query = 'INSERT INTO tb_user (user_id, user_name, user_surname, village, district, province) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [user_id, user_name, user_surname, village, district, province], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: result.insertId, user_id, user_name, user_surname, village, district, province });
    });
  });
  
//-----PUT ----ແກ້ ໄຂ <--> ອັບ ເດດ ຂໍ້ມູນ
  user.put('/users/:id', (req, res) => {
    const { user_id, user_name, user_surname, village, district, province } = req.body;
    const query = 'UPDATE tb_user SET user_id= ?, user_name= ?, user_surname= ?, village= ?, district= ?, province = ? WHERE user_id = ?';
    db.query(query, [user_id, user_name, user_surname, village, district, province, req.params.id], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ id: req.params.id, user_id, user_name, user_surname, village, district, province });
    });
  });
  
  user.delete('/users/:id', (req, res) => {
    db.query('DELETE FROM tb_user WHERE user_id = ?', [req.params.id], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(204).end();
    });
  });

  module.exports = user;