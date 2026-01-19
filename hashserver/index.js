const express = require('express')
const app = express()
const {generateRandomString, PrintTimestamp} = require("./hashTimestamp")

let initialHashStamp = PrintTimestamp();
let initialHash = generateRandomString(6);

app.get('/hash', (req, res) => {
  const timeStampNow = PrintTimestamp();
  res.send(`<h1>${timeStampNow}</h1>`)
})

app.get('/initial', (req, res) => {
  res.send(`<h1>${initialHashStamp}</h1>`)
})

app.get('/', (req, res) => {
  res.send(`<h1>Application ${initialHash}. Request ${generateRandomString(6)}</h1>`)
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})