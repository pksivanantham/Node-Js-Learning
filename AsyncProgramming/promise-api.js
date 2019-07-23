const p = Promise.resolve('I am already resolved');
//const p = Promise.reject(new Error('I am already rejected'));

p
.then((data)=>console.log(data))
.catch((err)=>console.log('Error',err));

var p1 = new Promise((resolve,reject)=>{

    setTimeout(() => {
        
        resolve('From promise 1');

    }, 3000);

});

var p2 = new Promise((resolve,reject)=>{

    setTimeout(() => {
        
        resolve('From promise 2');
        //reject(new Error('Promise 2 ran into error'));
        
    }, 3000);

});

Promise
.all([p1,p2])
.then((d)=>console.log('all',d))
.catch((err)=>console.log(err));

Promise
.race([p1,p2])
.then((d)=>console.log('race',d))
.catch((err)=>console.log(err));