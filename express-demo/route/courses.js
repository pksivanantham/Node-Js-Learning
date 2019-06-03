const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

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

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    let course = courses.find((item) => item.id == req.params.id);
    if (!course) return res.status(404).send("Resource not found");
    res.send(course);
});

router.post('/', (req, res) => {

    const { error } = validateSchema(req.body);
    if (error) return res.status(404).send(error);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


router.put('/:id', (req, res) => {

    //404
    let course = courses.find((item) => item.id == req.params.id);
    if (!course) return res.status(404).send("Resource not found");

    //400
    const { error } = validateSchema(req.body);
    if (error) return res.status(400).send(error);
    course.name = req.body.name;
    res.send(course);
});


router.delete('/:id', (req, res) => {

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
module.exports=router;