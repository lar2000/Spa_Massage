const express = require('express')
const db = require('./db_connection')

const protype = express.Router();
protype.get('/protype', (req, res) => {
  db.query('SELECT * FROM product_type',
     (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

module.exports = protype;