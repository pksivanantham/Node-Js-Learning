const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(()=>console.log('Connected to the database..'))
.catch((err)=>console.log('Could not connect to the database..',err));