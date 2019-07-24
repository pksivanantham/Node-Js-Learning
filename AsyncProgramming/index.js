console.log('Before');
//Promise based approach
getUser(1)
    .then((userData) => getRepositories(userData.githubUsername))
    .then((repos) => getCommits(repos[0]))
    .then((commits) => console.log(commits))
    .catch((error) => console.log(error.message));//If promises got rejected then catch will handle the errors        


//Async Await
async function displayCommits() {//async await is syntatic sugar of promises

    try {

        const user = await getUser(1);

        const repos = await getRepositories(user.githubUsername);

        const commits = await getCommits(repos[0]);

        console.log('Commits', commits)

    }
    catch (err) {
        console.log(err);
    }
    finally {
        console.log('finally')
    }

}

displayCommits();

console.log('After');

function getUser(userId) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            console.log('Reading a user from database..');
            resolve({ id: userId, githubUsername: 'pksivanantham' });

        }, 2000);
    });
}

function getRepositories(username) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            console.log(`Reading repo's from database..`);
            resolve(['repo1', 'repo2', 'repo3'])

        }, 2000);

    });

}

function getCommits(repo, callback) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            console.log(`Reading commit's from database..`);
            resolve(['commit1', 'commit2', 'commit3'])
            //reject(new Error('Ran into Error !!!!!!!!'));

        }, 2000);

    });

}