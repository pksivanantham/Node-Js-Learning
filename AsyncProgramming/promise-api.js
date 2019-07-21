const p = Promise.resolve('I am already resolved');
//const p = Promise.reject(new Error('I am already rejected'));

p
.then((data)=>console.log(data))
.catch((err)=>console.log('Error',err));
