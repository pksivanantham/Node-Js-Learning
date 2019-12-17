const morgan = require('morgan');
const express = require('express');
const app = express();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/config')();
require('./startup/validation')();

app.use(morgan('dev'));//Added for logging network requests

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));