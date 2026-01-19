const express = require('express')
const app = express()

let counter = 0;

app.get('/', (req, res) => {
  res.send(`pong ${counter++}`)
})

app.get('/pingpong', (req, res) => {
  res.send(`pong ${counter++}`)
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})