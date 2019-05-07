const express = require('express');
const app = express();
const Joi=require('@hapi/joi');
app.use(express.json());

const courses = [
    {
        id: 1,
        name: 'Tamil'
    },
    {
        id: 2,
        name: 'English'
    }
];
app.get('/', (req, res) => {

    res.send('Hello Express Js');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    let course= courses.find((item)=>item.id==req.params.id);
    if(!course) res.status(404).send("Resource not found");        
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const course = { 
        id: courses.length + 1, 
        name: req.body.name 
    };
    courses.push(course);        
    res.send(course);
});

const port = process.env.TESTPORT||5000; //POWERSHELL COMMAND :$env:<Variable_name> = value
app.listen(port,()=>{ console.log(`Listening on port ${port}..`)});
