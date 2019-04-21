var util = require('util');
var eventEmitter = require('events').EventEmitter;

var Resource = function (maxCount) {
    var self = this;
    process.nextTick(function () {
        var count = 0;
        self.emit('start')
        var runInterval = setInterval(function () {
            count++;
            self.emit('run', count);
            if (count == maxCount) {
                self.emit('stop', count);
                clearInterval(runInterval);
            }
        }, 100)
    })
    return self;
}

util.inherits(Resource, eventEmitter);
module.exports = Resource;