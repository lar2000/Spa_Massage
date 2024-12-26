const express = require('express');
const db = require('./db_connection');

const customer = express.Router();

// Define the fields to use for customer operations
const customerFields = ['cust_id','cust_name','cust_surname','email','status'];
const InsertFields = ['cust_id','cust_name','cust_surname','email','status'];

// Get all customers
customer.get('/customer', (req, res) => {
  db.query(
    `SELECT ${customerFields.join(', ')} FROM customer`,
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
  const Defaults = { ...req.body, status: req.body.status !== undefined ? req.body.status: true,

  };
  const values = InsertFields.map(field => Defaults[field]);

  const query = `INSERT INTO customer (${InsertFields.join(', ')}) 
  VALUES (${InsertFields.map(() => '?').join(', ')})`;

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to add customer.' });
    }
    res.status(201).json({ id: result.insertId, ...Defaults });
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
  const query = 'UPDATE customer SET status = ? WHERE cust_id = ?';
  const values = [false, req.params.id];
  db.query(query, values, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to delete customer.' });
    }
    res.status(204).send(); // No content to send back
  });
});

module.exports = customer;
