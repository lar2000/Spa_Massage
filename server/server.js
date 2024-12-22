const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// import ແບບ ໃຊ້ module.export = city, module.export = province, module.export = user

const service = require('./api/service');
const staff = require('./api/staff');  
const country = require('./api/country');
const customer = require('./api/customer');


app.use('/', service)
app.use('/', staff)
app.use('/', country)
app.use('/', customer)

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});