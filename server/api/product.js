const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('./db_connection');

const product = express.Router();
// Define the fields in an array
const productFields = [
  'pro_id',
  'pro_name',
  'amount',
  'price',
  'total',
];
const productFieldsString = productFields.join(', ');

const productSetClause = productFields.map(field => `${field} = ?`).join(', ');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads', 'images');
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

product.get('/product', (req, res) => {
  db.query(
    `SELECT ${productFieldsString}, img_path FROM product`,
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    }
  );
});

//Add new product
product.post('/product', upload.single('img_path'), (req, res) => {
  const productFields = ['pro_id', 'pro_name', 'amount', 'price', 'total'];
  const values = productFields.map(field => req.body[field]);
  const image = req.file ? `uploads/images/${req.file.filename}` : null;

  const query = `INSERT INTO product (${productFieldsString}, img_path) 
  VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(query, [...values, image], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, ...req.body });
  });
});
product.put('/product/:id', upload.single('img_path'), (req, res) => {
  const productFields = ['pro_id', 'pro_name', 'amount', 'price', 'total']; 
  const values = productFields.map(field => req.body[field]);
  const image = req.file ? `uploads/images/${req.file.filename}` : null;

  // Set up the base query
  let query = `UPDATE product SET ${productFields.map(field => `${field} = ?`).join(', ')}`;
  const queryParams = [...values];

  // Only include image in the query if it's not null
  if (image) {
    query += `, img_path = ?`;
    queryParams.push(image);
  }

  query += ` WHERE pro_id = ?`;
  queryParams.push(req.params.id);

  // Execute the query
  db.query(query, queryParams, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ id: req.params.id, ...req.body, image });
  });
});


product.delete('/product/:id', (req, res) => {
  db.query('DELETE FROM product WHERE pro_id = ?', [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).end();
  });
});

module.exports = product;
