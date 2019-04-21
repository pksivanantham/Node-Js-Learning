const http =require('http');


const server =http.createServer( (req,res)=>{

if(req.url ==='/')
{
    res.write('Hello from node server listening on 5000');
    
    res.end();
}


});

server.listen(5000);

