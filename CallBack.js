var eventEmitter=require("events").EventEmitter;

var getResource=function(c)
{
    var e=new eventEmitter();
    process.nextTick(function(){
        var count=0;
        e.emit('start')
       var runInterval= setInterval(function(){
count++;
e.emit('run',count);
if(count==c)
{
    e.emit('stop',count);
    clearInterval(runInterval);
}

        },100)
    })
    return e;
}
var r=getResource(5);
r.on('start',function(){
console.log("Event is started");
});

r.on('run',function(count){
console.log("Event is running :",count);
});
r.on('stop',function(count){
console.log("Event is stopped the final count is  :",count);
});
