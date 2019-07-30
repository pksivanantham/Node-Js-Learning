const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to the database..'))
    .catch((err) => console.log('Could not connect to the database..', err));

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});//creating new schema for new table

//Binding schema with actual table(collection) from db
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    //creating new record(document)
    let course = new Course({
        name: 'Node js ',
        author: 'Siva',
        tags: ['Node', 'v8'],
        isPublished: true
    });

    let result = await course.save();
    console.log(result);
}

createCourse();