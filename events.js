const EventEmitter = require('events');
const Logger = require('./logger');

const log = new Logger();

log.on('logging', (args) => {

    console.log('Logging', args);

});

log.log("Sample Message");


