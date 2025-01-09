const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // To parse JSON bodie

// import ແບບ ໃຊ້ module.export = city, module.export = province, module.export = user

const service = require('./api/service');
const staff = require('./api/staff');  
const country = require('./api/country');
const customer = require('./api/customer');
const imp = require('./api/imp');
const product = require('./api/product');
const protype = require('./api/protype');


app.use('/', service)
app.use('/', staff)
app.use('/', country)
app.use('/', customer)
app.use('/', imp)
app.use('/', product)
app.use('/', protype)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});