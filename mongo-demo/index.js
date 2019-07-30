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
        name: 'React js ',
        author: 'Siva',
        tags: ['ReactJS', 'VirtualDOM'],
        isPublished: true
    });

    let result = await course.save();
    console.log(result);
}

//createCourse();

async function getCourses() {

    //Comparision operators
    //$lt,$gt,$lte,$gte,$in,$nin,$eq,$neq

    let courses = await Course
    .find({isPublished:true}) 
    //.find({price:{$gt:10,$lt:40}})
    //.find({price:{$in:[10,20,30]}})
    .sort({name:-1})//1 asc -1 desc
    .select({name:1,author:1});//1 denoting true here
    
    console.log(courses);

}

getCourses();