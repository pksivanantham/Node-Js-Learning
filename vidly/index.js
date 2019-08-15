const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
  .then(() => console.log('Connected to the database..'))
  .catch((err) => console.log('Unable to connect to the database..', err));

app.use(express.json());
app.use(morgan('dev'));//Added for logging network requests

app.use('/api/genres', genres);
app.use('/api/customers',customers);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));