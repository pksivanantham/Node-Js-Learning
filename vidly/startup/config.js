const config = require('config');

module.exports = function () {
    if (!config.has('jwtPrivateKey') || (config.get('jwtPrivateKey') === "")) {
        throw new Error(`Error:jwtPrivateKey is not defined`);
        //process.exit(1); Because we are catching it in winston and stopping the process there itself
    }

}