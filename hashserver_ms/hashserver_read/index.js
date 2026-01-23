const express = require('express')
const app = express()
const path = require('path');
const fs = require('node:fs')
const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'logs.txt')
const filePathPingPong = path.join(directory, 'pingpong.txt')
const {text} = require('stream/consumers');

const { Readable } = require('stream');
const { finished } = require('stream/promises');

const confPath = "/usr/src/app/conf/"
const confFile = "information.txt"

const url = "http://ping-pong-svc:2345/pings"


async function streamToString(stream) {
  return await text(stream);
}


app.get('/logs', (req, res) => {
  let part1=""
  let part2="" 
  let part3=""
  let part4=""
  try {
    part1 = fs.readFileSync(filePath, 'utf8')
    part3 = fs.readFileSync(confPath + confFile, 'utf8')
    part4 = process.env.MESSAGE
  }
  catch {
    part1="no logs yet"
  }
  fetch(url)
  .then(response=> {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      streamToString(response.body)
      .then(convertedtext => {
        console.log("this is it:", convertedtext)
        part2=convertedtext
        res.send(`<p>file content:</p>${part3.toString()}<p><p>env variable: </p>${part4.toString()}<p>${part1.toString()}</p><p>Ping / Pongs: ${part2.toString()}</p>`);
      })
  })
  .catch(err=>{
    res.status(500).send(`error ${err}`)
  })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})