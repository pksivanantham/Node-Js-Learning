const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{useNewUrlParser:true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author:{//Embedded Docouments here
    type:authorSchema,
    required:true
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateCourse(courseId)
{
   await Course.updateOne({_id:courseId},{
    $set:{
      'author.name':'Siva'
    }
  })
}
async function deleteAuthorInsideCourse(courseId)
{
   await Course.updateOne({_id:courseId},{
    $unset:{
      'author':''
    }
  })
}
//createCourse('Node Course', new Author({ name: 'Sivanantham' }));
//listCourses();
//updateCourse('5d579d5f6ca3b907307a581d');
deleteAuthorInsideCourse('5d579d5f6ca3b907307a581d');