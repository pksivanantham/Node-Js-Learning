const mongoose = require('mongoose');
const logger = require('../utils/consoleLogger');
const config = require('config');

const db = config.get('db');
module.exports = function () {

    mongoose.connect(db, { useNewUrlParser: true })
        .then(() => logger.log('info', `Connected to the database :${db}..`))
    mongoose.set('useCreateIndex', true);//To remove unique index warning on mongoose

}