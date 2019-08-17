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
  authors:{//Embedded Docouments here
    type:[authorSchema],
    required:true
  }
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses[0].authors[0].name)
  console.log(courses);
}

async function updateCourse(courseId,authorId)
{
  //  await Course.updateOne({_id:courseId},{
  //   $set:{
  //     'author.name':'Siva'
  //   }
  // })
  let course = await Course.findById({_id:courseId});

  let authors = course.authors.id(authorId);

  authors.name= `${authors.name} -->Updated`;

  /*
  mongoose: 
  calling `save()` on a subdoc does **not** save the document to MongoDB, it only runs save middleware.
   Use `subdoc.save({ suppressWarning: true })` to hide this warning if you're sure this behavior is right for your app. 
  */
  await authors.save({suppressWarning:true});

  console.log(authors);

}

async function addNewAuthor(courseId,author)
{

  let course = await Course.findById({_id:courseId});

  course.authors.push(author);

  await course.save();

  console.log(course);
}
async function deleteAuthorInsideCourse(courseId,authorId)
{
  //  await Course.updateOne({_id:courseId},{
  //   $unset:{
  //     'author':''
  //   }
  // })

  let course = await Course.findById({_id:courseId});

  let author = course.authors.id(authorId);

  course.authors.remove(author);

  await course.save();

  console.log(course);
}


// createCourse('Node Course',[
//   new Author({ name: 'Groot' }),
//   new Author({ name: 'Rocket' })
// ]);
//listCourses();
//updateCourse('5d57aee8a60e2929b85395ca','5d57aee8a60e2929b85395c8');
//addNewAuthor('5d57aee8a60e2929b85395ca',new Author({name:'StarLord'}));
deleteAuthorInsideCourse('5d57aee8a60e2929b85395ca','5d57aee8a60e2929b85395c8');

//deleteAuthorInsideCourse('5d579d5f6ca3b907307a581d');