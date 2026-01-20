var express = require('express');
var router = express.Router();

const path = require('node:path');
const fs = require('node:fs')

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'dynamic.jpg')
const filePathTimeStamp = path.join(directory, 'imagetimestamp.txt')

async function refrechImage() {
  const url = "https://picsum.photos/1200";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    fs.writeFile(filePath, response.body, err => {
      if (err) {
       throw new Error(`Response status: ${err}`)
      } else {
        const formattedDate = currentDate.toISOString();
        fs.writeFile(filePathTimeStamp, `${formattedDate}`, err => {
              if (err) {
                throw new Error(`Response status: ${err}`)
              } else {
                    console.log("timestamp ok")
              }
            });
      }
    });
    
  } catch (error) {
    console.error(error.message);
  }
}

router.get('/', (req, res, next) => {
    const timestamp = fs.readFileSync(filePath, 'utf8')
    const timestampData = new Date(timestamp)
    // if image exits and it is < 10 min
    // send image from cache
    // else fetch new image and send it instead
})

module.exports = router;