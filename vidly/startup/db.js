const mongoose = require('mongoose');
const logger = require('../utils/consoleLogger');

module.exports = function () {

    mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
        .then(() => logger.log('info', 'Connected to the database..'))
    mongoose.set('useCreateIndex', true);//To remove unique index warning on mongoose

}