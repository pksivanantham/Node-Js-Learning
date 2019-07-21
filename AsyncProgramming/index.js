console.log('Before');

getUser(1)
.then((userData)=>getRepositories(userData.githubUsername))
.then((repos)=> getCommits(repos[0]))
.then((commits)=>console.log(commits))
.catch((error)=>console.log(error.message));//If promises got rejected then catch will handle the errors        

console.log('After');

function getUser(userId) {

    return new Promise((resolve,reject)=>{

        setTimeout(() => {

            console.log('Reading a user from database..');
            resolve({ id: userId, githubUsername: 'pksivanantham' });
    
        }, 2000);
    });
}

function getRepositories(username) {

    return new Promise((resolve,reject)=>{

        setTimeout(() => {
            console.log(`Reading repo's from database..`);
            resolve(['repo1', 'repo2', 'repo3'])
    
        }, 2000);

    });
    
}

function getCommits(repo, callback) {

    return new Promise((resolve,reject)=>{

        setTimeout(() => {
            console.log(`Reading commit's from database..`);
            resolve(['commit1', 'commit2', 'commit3'])
    
        }, 2000);

    });
   
}