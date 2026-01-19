const path = require('node:path');

const fs = require('node:fs')
const {generateRandomString, PrintTimestamp} = require("./hashTimestamp")
const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'logs.txt')

let initialHash = generateRandomString(6);

fs.writeFile(filePath, "", err => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
  }
});


const PrintTimestampToFile = () => {
   let timestamp = PrintTimestamp(initialHash);
   fs.appendFile(filePath, timestamp + '\n', err => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
    }
  });
}

setInterval(PrintTimestampToFile, 5000);

