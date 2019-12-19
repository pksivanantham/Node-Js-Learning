const winston = require('winston');
const { format: { combine,colorize,simple } } = winston;

module.exports = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: combine(
                colorize({ all: true }),
                simple()
            )
        }),
    ]
});
