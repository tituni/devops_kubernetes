const knex = require('./dbConnection');

const tableName = "notes"

const checkTable = async () => {
  knex.schema.hasTable(tableName)
  .then(hasTable => {
    console.log("has table",hasTable)
    if(!hasTable){
           return knex.schema.createTable('notes', t => {
                t.increments('id').primary()
                t.string('content').notNullable()
                t.datetime('date').notNullable()
                t.boolean('important').notNullable()
      })}
    else {
        return Promise.resolve(true)
      }
    })
}

module.exports = checkTable;