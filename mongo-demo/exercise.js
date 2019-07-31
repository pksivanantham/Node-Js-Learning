const mongoose = require('mongoose');
const debug = require('debug');

const exerciseOutput1 = debug('Exercise-1'),
    exerciseOutput2 = debug('Exercise-2'),
    exerciseOutput3 = debug('Exercise-3');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
    .then(() => console.log('Connected to the db..'))
    .catch((err) => console.log('Error occured while connecting the db', err));


const courseSchema = mongoose.Schema({
    tags: [String],
    date: { type: Date, default: Date.Now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('course', courseSchema);


async function getCourses() {

    let courses = await Course
        .find({ isPublished: true, tags: { $in: ['backend'] } })//tags:'backend' also works here
        .sort({ name: 1 })
        //.select({ name: 1, author: 1 })
        .select('name author')

    exerciseOutput1(courses);

    let courses1 = await Course
        //.find({isPublished:true,tags:{$in :['frontend','backend']}})
        .find({ isPublished: true })
        .or([{ tags: 'frontend' }, { tags: 'backend' }])
        //.sort({price:-1})
        .sort('-price')
        .select('name author price');

    exerciseOutput2(courses1);


    let courses2 = await Course
        //.find({isPublished:true,tags:{$in :['frontend','backend']}})
        .find({ isPublished: true })
        .or([
            { price: { $gte: 15 } },
            { name: /.*by.*/i }
        ])
        //.sort({price:-1})
        .sort('-price')
        .select('name author price');

    exerciseOutput3(courses2);
}

getCourses();