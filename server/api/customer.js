const express = require('express');
const db = require('./db_connection');

const customer = express.Router();
const Fields = ['cust_id', 'cust_name', 'cust_surname', 'email', 'status', 'state'];

// Get all customers with state = 1 (active)
customer.get('/customer', (req, res) => {
  db.query(
    `SELECT ${Fields.join(', ')} FROM customer WHERE state = 1`,
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
  const Defaults = { ...req.body, status: 0, state: 1}; // Automatically set status to 1

  // Function to generate a random cust_id starting with 'N-' and followed by 5 random characters
  function generateRandomCustId() {
    const randomId = Math.random().toString(36).substr(2, 5).toUpperCase(); // 5 random alphanumeric characters
    return `N-${randomId}`;
  }

  const custId = generateRandomCustId(); // Generate the cust_id
  const values = Fields.map(field => (field === 'cust_id' ? custId : Defaults[field]));

  const query = `INSERT INTO customer (${Fields.join(', ')}) 
  VALUES (${Fields.map(() => '?').join(', ')})`;

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to add customer.' });
    }
    res.status(201).json({ id: result.insertId, ...Defaults, cust_id: custId });
  });
});

// Update an existing customer
customer.put('/customer/:id', (req, res) => {
  const { cust_name, cust_surname, email, status } = req.body;

  if (!cust_name || !cust_surname || !email || typeof status === 'undefined') {
    return res.status(400).json({ error: 'cust_name, cust_surname, email, and status are required.' });
  }

  const query = `
    UPDATE customer 
    SET cust_name = ?, cust_surname = ?, email = ?, status = ?
    WHERE cust_id = ?`;

  const values = [cust_name, cust_surname, email, status, req.params.id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to update customer.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found.' });
    }
    res.status(200).json({ message: 'Customer updated successfully.', id: req.params.id, ...req.body });
  });
});

// Delete a customer (soft delete by setting state to 0)
customer.delete('/customer/:id', (req, res) => {
  const query = 'UPDATE customer SET state = 0 WHERE cust_id = ?';
  const values = [req.params.id];

  db.query(query, values, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to delete customer.' });
    }
    res.status(204).send();
  });
});

module.exports = customer;
