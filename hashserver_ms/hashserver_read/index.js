const express = require('express')
const app = express()
const path = require('path');
const fs = require('node:fs')
const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'logs.txt')
const filePathPingPong = path.join(directory, 'pingpong.txt')

app.get('/logs', (req, res) => {
  let part1=""
  let part2=""
  try {
    part1 = fs.readFileSync(filePath, 'utf8')
  }
  catch {
    part1="no logs yet"
  }
  try {
    part2 = fs.readFileSync(filePathPingPong, 'utf8')
   }
  catch {
    part2="no pings yet"
  }
    res.send(`<p>${part1.toString()} </p><p>Ping / Pongs: ${part2.toString()}</p>`);

})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})