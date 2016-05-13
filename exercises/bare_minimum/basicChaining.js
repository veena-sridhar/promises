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


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {

  return fs.readFileAsync(readFilePath)
    .then(function (fileData) {
      fileData = fileData.toString().split('\n')[0];
      return fileData;
    })
    .then(function (fileData) {
      //fileData = fileData.toString().slice(0, ',');
      request(('https://api.github.com/users/' + fileData), 'utf-8');
      console.log('resquest is: ', request);
    })
    .then(function (fileData) {
      console.log('filedata string: ', fileData.toString());
      return fs.writeFileSync(writeFilePath, JSON.stringify(fileData));
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};

