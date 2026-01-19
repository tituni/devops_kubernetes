const express = require('express')
const app = express()
const path = require('path');

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'logs.txt')

app.get('/', (req, res) => {
  res.sendFile(filePath, (err) => {
   if (err) {
       console.log('Error sending file:', err);
       res.status(500).send('File not found');
   } else {
       console.log('Sent:', 'logs.txt');
   }
})})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})