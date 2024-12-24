const express = require('express');
const db = require('./db_connection');

const customer = express.Router();

// Define the fields to use for customer operations
const customerFields = [
  'cust_name',
  'cust_surname',
  'email',
  'status',
];

// Get all customers
customer.get('/customer', (req, res) => {
  db.query(
    `SELECT cust_id, ${customerFields.join(', ')} FROM customer`,
    (err, results) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Failed to retrieve customers.' });
      }
      res.json(results);
    }
  );
});

// Add new customer
customer.post('/customer', (req, res) => {
  const values = customerFields.map(field => req.body[field]);

  // Validate input data
  for (let i = 0; i < customerFields.length; i++) {
    if (!values[i]) {
      return res.status(400).json({ error: `${customerFields[i]} is required.` });
    }
  }

  const query = `INSERT INTO customer (${customerFields.join(', ')}) 
  VALUES (${customerFields.map(() => '?').join(', ')})`;

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to add customer.' });
    }
    res.status(201).json({ id: result.insertId, ...req.body });
  });
});

// Update an existing customer
customer.put('/customer/:id', (req, res) => {
  const values = customerFields.map(field => req.body[field]);

  // Validate input data
  for (let i = 0; i < customerFields.length; i++) {
    if (!values[i]) {
      return res.status(400).json({ error: `${customerFields[i]} is required.` });
    }
  }

  const query = `UPDATE customer SET ${customerFields.map(field => `${field} = ?`).join(', ')} 
  WHERE cust_id = ?`;
  db.query(query, [...values, req.params.id], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to update customer.' });
    }
    res.status(200).json({ id: req.params.id, ...req.body });
  });
});

// Delete a customer
customer.delete('/customer/:id', (req, res) => {
  db.query('DELETE FROM customer WHERE cust_id = ?', [req.params.id], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to delete customer.' });
    }
    res.status(204).send(); // No content to send back
  });
});

module.exports = customer;
