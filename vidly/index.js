const Joi = require('@hapi/joi');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const mongoose = require('mongoose');
const morgan = require('morgan');
const express = require('express');
const app = express();

Joi.objectId = require('joi-objectid')(Joi);

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
  .then(() => console.log('Connected to the database..'))
  .catch((err) => console.log('Unable to connect to the database..', err));

app.use(express.json());
app.use(morgan('dev'));//Added for logging network requests

app.use('/api/genres', genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));