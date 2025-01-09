const express = require('express');
const db = require('./db_connection');

const imp = express.Router();
const Fields = ['ip_id', 'ip_name', 'amount', 'date'];

// Get all imps
imp.get('/imp', (req, res) => {
  db.query(
    `SELECT * FROM importproduct`,
    (err, results) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Failed to retrieve imps.' });
      }
      res.json(results);
    }
  );
});

// Add new imp
imp.post('/imp', (req, res) => {
  const { ip_name, amount, date } = req.body;

  if (!ip_name || !amount || !date) {
    return res.status(400).json({ error: 'ip_name, amount, and date are required.' });
  }

  function generateRandomIpId() {
    const randomId = Math.random().toString(36).slice(2, 7).toUpperCase();
    return `IP-${randomId}`;
  }

  const ipId = generateRandomIpId();
  const values = [ipId, ip_name, amount, date];

  const query = `INSERT INTO importproduct (${Fields.join(', ')}) VALUES (${Fields.map(() => '?').join(', ')})`;

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to add imp.' });
    }
    res.status(201).json({ id: result.insertId, ip_id: ipId, ip_name, amount, date });
  });
});

// Update an existing imp
imp.put('/imp/:id', (req, res) => {
  const { ip_name, amount, date } = req.body;

  if (!ip_name || !amount || !date) {
    return res.status(400).json({ error: 'ip_name, amount, and date are required.' });
  }

  const query = `
    UPDATE importproduct 
    SET ip_name = ?, amount = ?, date = ?
    WHERE id = ?`;

  const values = [ip_name, amount, date, req.params.id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to update imp.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'imp not found.' });
    }
    res.status(200).json({ message: 'imp updated successfully.', id: req.params.id, ip_name, amount, date });
  });
});

// Delete an imp (hard delete)
imp.delete('/imp/:id', (req, res) => {
  const query = 'DELETE FROM importproduct WHERE ip_id = ?';
  const values = [req.params.id];

  db.query(query, values, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to delete imp.' });
    }
    res.status(204).send();
  });
});

module.exports = imp;
