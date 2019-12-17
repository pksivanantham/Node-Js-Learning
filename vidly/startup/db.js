const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
    mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
        .then(() => winston.log('info','Connected to the database..'))
    mongoose.set('useCreateIndex', true);//To remove unique index warning on mongoose

}