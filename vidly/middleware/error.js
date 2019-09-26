const logger = require('./errorLogger');

module.exports = function(err, req, res, next) {

    logger.log('error',err.message,err);

    res.status(500).send('Error occured.');

}