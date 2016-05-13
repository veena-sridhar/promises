/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var request = Promise.promisifyAll(require('request'));
var construct = require('./promiseConstructor');
var helper = require('./promisification');


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return construct.pluckFirstLineFromFileAsync(readFilePath)
  .then(function (username) {
    return helper.getGitHubProfileAsync(username);
  })
  .then(function (profile) {
    return fs.writeFileSync(writeFilePath, JSON.stringify(profile));
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};

