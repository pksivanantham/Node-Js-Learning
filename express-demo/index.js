const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const app = express();
const courses = require('./route/courses');
const logger = require('./Logger');
const dbConfig = require('config');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use(logger);//Custom middleware function

console.log(`Current Env :${app.get('env')}`);

app.use(express.static('public'));//To serve static files

if (app.get('env') === 'development')
    app.use(morgan('tiny'));
if(dbConfig.has('Customer.dbConfig.host'))    
    console.log(`value from config json file :${dbConfig.get('Customer.dbConfig.host')}`);
app.use('/api/courses', courses)//from router

app.get('/', (req, res) => {

    res.send('Hello Express Js');
});

const port = process.env.TESTPORT || 5000; //POWERSHELL COMMAND :$env:<Variable_name> = value
app.listen(port, () => { console.log(`Listening on port ${port}..`) });
