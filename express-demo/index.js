const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const app = express();
const courses = require('./route/courses');
const home = require('./route/home');
const logger = require('./middleware/Logger');
const dbConfig = require('config');
const appDebug = require('debug')('APP');
const debug = require('debug')('CONSOLE');
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use(logger);//Custom middleware function

debug(`Current process.env.NODE_ENV  :${process.env.NODE_ENV}`);
debug(`Current Env :${app.get('env')}`);

app.use(express.static('public'));//To serve static files

if (app.get('env') === 'development')
    app.use(morgan('dev'));

if(dbConfig.has('Customer.dbConfig.host'))    
debug(`value from config json file : 
    HOST= ${dbConfig.get('Customer.dbConfig.host')} ; 
    Password : ${ dbConfig.get('Customer.dbConfig.db-password')}`);//${env:db-password} =" 4321"

//Views
app.set('view engine','pug');
app.set('views','./views')

 //Routes   
app.use('/api/courses', courses);//from router
app.use('/', home);

const port = process.env.TESTPORT || 5000; //POWERSHELL COMMAND :$env:<Variable_name> = value 
app.listen(port, () => { appDebug(`Listening on port ${port}..`) });
