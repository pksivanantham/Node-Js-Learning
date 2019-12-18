const winston = require('./node_modules/winston');
const { format: { combine } } = winston;

module.exports = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: combine(
                winston.format.colorize({ all: true }),
                winston.format.simple()
            )
        }),
    ]
});
