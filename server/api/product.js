const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('./db_connection');

const product = express.Router();
const productFields = [
  'pro_name',
  'size',
  'amount',
  'price',
  'total',
];
const productFieldsString = productFields.join(', ');
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

// Function to generate a unique product ID starting with 'P-'
function generateProductId(callback) {
  const randomId = Math.random().toString(36).slice(2, 7).toUpperCase();
  const proId = `P-${randomId}`;

  // Check if the generated pro_id already exists in the database
  db.query('SELECT pro_id FROM product WHERE pro_id = ?', [proId], (err, results) => {
    if (err) {
      return callback(err, null);
    }

    if (results.length > 0) {
      return generateProductId(callback); // Recursively call the function
    }
    // If no duplicate, return the unique pro_id
    callback(null, proId);
  });
}

product.get('/product', (req, res) => {
  db.query(
    `SELECT ${productFieldsString}, img_path, pro_id FROM product`,
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    }
  );
});

// Add new product
product.post('/product', upload.single('img_path'), (req, res) => {
  const values = productFields.map(field => req.body[field]);
  const image = req.file ? `uploads/images/${req.file.filename}` : null;

  // Generate a unique product ID
  generateProductId((err, proId) => {
    if (err) {
      return res.status(500).json({ error: 'Error generating unique product ID' });
    }

    const query = `INSERT INTO product (${productFieldsString}, img_path, pro_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [...values, image, proId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: result.insertId, pro_id: proId, ...req.body });
    });
  });
});

// Update product details
product.put('/product/:id', upload.single('img_path'), (req, res) => {
  const productFields = ['pro_name', 'size', 'amount', 'price', 'total']; 
  const values = productFields.map(field => req.body[field]);
  const image = req.file ? `uploads/images/${req.file.filename}` : null;

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
// Delete product
product.delete('/product/:id', (req, res) => {
  db.query('DELETE FROM product WHERE pro_id = ?', [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).end();
  });
});

module.exports = product;
