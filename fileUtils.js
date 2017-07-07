const fs = require('fs');

module.exports = function readTextFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if(err) {
        return reject(new Error(err));
      }
      resolve(data.toString());
    })
  });
}