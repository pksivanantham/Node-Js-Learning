
const EventEmitter = require('events');

const url = "http://google.com";


class Logger extends EventEmitter {

    log (message) {

        console.log(message);
        this.emit('logging', { data: 'random data' });
    };

}

module.exports = Logger;