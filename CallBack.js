var eventEmitter=require("events").EventEmitter;
console.log(eventEmitter)
var getResource=function(c)
{
    var e=new eventEmitter();
    process.nextTick(function(){
        var count=0;
        e.emit('start')
    })
    return e;
}
var r=getResource(1);
r.on('start',function(){
console.log("Event is started");
});
