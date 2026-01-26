const config = require('./config.js')
const options = config.DATABASE_OPTIONS;

let db = null

try {
    db = require('knex')(options);
}
catch(err) {
  console.log(`error connecting to db: ${err}`)
  console.log(`config`, options)
  return
}

module.exports = db;