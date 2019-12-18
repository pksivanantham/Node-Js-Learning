const morgan = require('morgan');
const express = require('express');
const app = express();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/config')();
require('./startup/validation')();

const logger = require('./utils/consoleLogger');


app.use(morgan('dev'));//Added for logging network requests

const port = process.env.PORT || 3000;
app.listen(port, () => logger.log('silly',`Listening on port ${port}...`));
