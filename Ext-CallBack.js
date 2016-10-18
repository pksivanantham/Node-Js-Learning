var eventEmitterEx=require('./resource');
var r=new eventEmitterEx(5);
r.on('start',function(){
console.log("Event is started");
});

r.on('run',function(count){
console.log("Event is running :",count);
});
r.on('stop',function(count){
console.log("Event is stopped the final count is  :",count);
});
