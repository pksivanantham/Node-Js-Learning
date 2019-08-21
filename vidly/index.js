const Joi = require('@hapi/joi');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const config = require('config');
const mongoose = require('mongoose');
const morgan = require('morgan');
const express = require('express');
const app = express();
Joi.objectId = require('joi-objectid')(Joi);

if (!config.has('jwtPrivateKey')|| (config.get('jwtPrivateKey')==="")) {
  console.error(`Error:jwtPrivateKey is not defined`);
  process.exit(1);
}
  
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
  .then(() => console.log('Connected to the database..'))
  .catch((err) => console.log('Unable to connect to the database..', err));
mongoose.set('useCreateIndex', true);//To remove unique index warning on mongoose

app.use(express.json());
app.use(morgan('dev'));//Added for logging network requests

app.use('/api/genres', genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users);
app.use('/api/auth',auth);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));