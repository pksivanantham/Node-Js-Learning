const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {

    let authToken = req.header('x-vidly-jwt');
    if (!authToken) return res.status(401).send('Access denied.');

    try {

        let payLoad = jwt.verify(authToken, config.get('jwtPrivateKey'));

        req.user = payLoad;

        next();//Calling next middleware on the pipeline
    }
    catch (ex) {
        console.log(ex);
        res.status(400).send('Invalid auth token');
    }

};