console.log('Before');

getUser(1, getRepositoriesCB);

console.log('After');

function getRepositoriesCB(userData) {
    getRepositories(userData.githubUsername, getCommitsCB)
}
function getCommitsCB(repos) {
    getCommits(repos[0], displayCommits)
}

function displayCommits(commits) {
    console.log(commits);
}

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

function getCommits(repo, callback) {
    setTimeout(() => {
        console.log(`Reading commit's from database..`);
        callback(['commit1', 'commit2', 'commit3'])

    }, 2000);
}