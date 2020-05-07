const winston = require('winston');
const { format : {combine, timestamp, prettyPrint }} = winston;
//require("winston-mongodb")
const logger = winston.createLogger({
    level: 'error',
    format: combine(winston.format.json(),
    timestamp(),
    prettyPrint()),
    transports: [
        new winston.transports.File({ filename: 'logfile.log', level: 'error' })
    ]
});

logger.add(new winston.transports.Console({
    format: combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
    )
}));

//logger.add(new winston.transports.MongoDB({db:'mongodb://localhost/vidly'}))

module.exports = logger;
