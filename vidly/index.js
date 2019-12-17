require('express-async-errors');
const winston = require('winston');
const logger = require('./middleware/errorLogger');
const Joi = require('@hapi/joi');
const config = require('config');
const mongoose = require('mongoose');
const morgan = require('morgan');
const express = require('express');
const app = express();
require('./startup/routes')(app);
Joi.objectId = require('joi-objectid')(Joi);

if (!config.has('jwtPrivateKey')|| (config.get('jwtPrivateKey')==="")) {
  console.error(`Error:jwtPrivateKey is not defined`);
  process.exit(1);
}

winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({ handleExceptions: true })//handle exceptions
  ]
});

process.on('uncaughtException',(err)=>{
  logger.log('error','Critical Error',err);
});

process.on('unhandledRejection',(ex)=>{
  logger.log('error','Unhabdled rejection',ex);
  throw ex;
});

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
  .then(() => console.log('Connected to the database..'))
  .catch((err) => console.log('Unable to connect to the database..', err));
mongoose.set('useCreateIndex', true);//To remove unique index warning on mongoose

app.use(morgan('dev'));//Added for logging network requests

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));