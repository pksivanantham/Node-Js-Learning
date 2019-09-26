const winston = require('winston');
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'logfile.log', level: 'error' })
    ]
});

logger.add(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
    )
}));

module.exports = logger;
