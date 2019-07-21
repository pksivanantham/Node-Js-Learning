console.log('Before');

getUser(1, (userData) => {

    console.log(userData);

    getRepositories(userData.githubUsername, (repos) => {

        console.log('Repos',repos);

    })

});

console.log('After');


function getUser(userId, callback) {

    setTimeout(() => {

        console.log('Reading a user from database..');
        callback({ id: userId, githubUsername: 'pksivanantham' });

    }, 2000);


}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log(`Reading repo's from database..`);
        callback(['repo1', 'repo2', 'repo3'])

    }, 2000);
}