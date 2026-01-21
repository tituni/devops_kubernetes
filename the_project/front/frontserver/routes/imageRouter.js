var express = require('express');
var router = express.Router();

const path = require('node:path');
const fs = require('node:fs')
const { Readable } = require('stream');
const { finished } = require('stream/promises');

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'dynamic.jpg')
const filePathTimeStamp = path.join(directory, 'imagetimestamp.txt')

let oneMoreTime = 0;

async function refreshImage() {
  const url = "https://picsum.photos/1200";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    console.log("url", response.body)    
    const destination = fs.createWriteStream(filePath)
    await finished(Readable.fromWeb(response.body).pipe(destination));
    console.log("writefile ok", filePath)
    
    // save timestamp
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString();
    fs.writeFile(filePathTimeStamp, `${formattedDate}`, err => {
    if (err) {
        throw new Error(`Response status: ${err}`)
        } else {
          console.log("timestamp ok")
        }
    });    
  } catch (error) {
    console.error(error.message);
  }
}

async function checkImage() {
      console.log("checkimage starts");
      let timestamp = null
      try {
        timestamp = fs.readFileSync(filePathTimeStamp, 'utf8')
        console.log("try timestamp");
      }
      catch {
        // this is the first time the application is run
        // creating first image and timestamp
         console.log("try timestamp catch");
        await refreshImage()
        return
      }
      const timestampDate = new Date(timestamp)
      const timestampNow = new Date()
      if((timestampNow - timestampDate) > 600000){
         console.log("if > 600000");
        if(oneMoreTime > 0){
          console.error("onemoretime");
          await refreshImage();
          oneMoreTime = 0;
        } else {
           console.error("else moretime");
          oneMoreTime++;
        }
      }
}

router.get('/', (req, res, next) => { 
    console.error("get image starts");
    checkImage()
    .then(()=> {
      res.sendFile(filePath);
    })          
    .catch((err)=>{
      res.status(500).send(`file read error: ${err}`);
    }) 
  })

module.exports = router;