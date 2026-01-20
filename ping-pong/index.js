const express = require('express')
const app = express()

const path = require('node:path');
const fs = require('node:fs')

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'pingpong.txt')

let counter = 0;

/*app.get('/', (req, res) => {
  res.send(`pong ${counter++}`)
})*/

app.get('/pingpong', (req, res) => {
    counter++;
    fs.writeFile(filePath, `${counter}`, err => {
      if (err) {
        res.send(`pong: ERROR`)
      } else {
        res.send(`pong ${counter}`)
      }
    });

 
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})