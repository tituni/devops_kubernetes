require('dotenv').config()

let PORT = process.env.PORT
let IMAGE_URL = process.env.IMAGE_URL

module.exports = {
    PORT,
    IMAGE_URL
}