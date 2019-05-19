const express = require('express');
const app = express();
const Joi = require('@hapi/joi');
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
    let course = courses.find((item) => item.id == req.params.id);
    if (!course) return res.status(404).send("Resource not found");
    res.send(course);
});

app.post('/api/courses', (req, res) => {

    const { error } = validateSchema(req.body);
    if (error) return res.status(404).send(error);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


app.put('/api/courses/:id', (req, res) => {

    //404
    let course = courses.find((item) => item.id == req.params.id);
    if (!course) return res.status(404).send("Resource not found");

    //400
    const { error } = validateSchema(req.body);
    if (error) return res.status(400).send(error);
    course.name = req.body.name;
    res.send(course);
});


app.delete('/api/courses/:id', (req, res) => {

    let course = courses.find((item) => item.id == req.params.id);
    if (!course) return res.status(404).send("Resource not found");

    const courseIndex = courses.indexOf(course);

    courses.splice(courseIndex, 1);

    return res.send(course);
});
function validateSchema(course) {

    const courseSchema = {

        name: Joi.string().required().min(3)
    };
    return Joi.validate(course, courseSchema);
}

const port = process.env.TESTPORT || 5000; //POWERSHELL COMMAND :$env:<Variable_name> = value
app.listen(port, () => { console.log(`Listening on port ${port}..`) });
