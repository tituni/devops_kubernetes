require('dotenv').config()
const options = {
    client: process.env.DB_TYPE,
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
    }
}

try {
    knex = require('knex')(options);
}
catch(err) {
  console.log(`error connecting to db: ${err}`)
  console.log(`config`, options)
  return
}

const checkTable = async (tableName) => {
  knex.schema.hasTable(tableName)
  .then(hasTable => {
    console.log("has table",hasTable)
    if(!hasTable){
         return knex.schema.createTable(tableName, function (table) {
            table.increments('id').primary();
            table.integer('value');
      })}
    else {
        return Promise.resolve(true)
      }
    })
}

const seedNotesDB = async () => {
    console.log(options)
    await knex.seed.run();          
    return await knex.destroy();   
}

module.exports = checkTable;