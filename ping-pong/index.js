const express = require('express')
const app = express()

const config = require('./utils/config')
const options = config.DATABASE_OPTIONS;
const PORT = config.PORT;

let knex = null

console.log("pingpong started")

console.log("pingpong config", options)

try {
    knex = require('knex')(options);
}
catch(err) {
  console.log(`error connecting to db: ${err}`)
  console.log(`config`, options)
  return
}

const tableName = "pingcounter"

console.log("knex ok")

const checkTable = async () => {
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

checkTable()
.then(ret => {
  app.get('/pingpong', (req, res) => {
        knex(tableName).select('*')
            .then((rows) => {
              if(rows.length >= 1){
                const newRow = {
                  value: rows[0].value + 1,
                  id: rows[0].id
                }
                knex(tableName).update(newRow).where('id', '=', newRow.id)
                .then(ret => {
                    return res.send(`pong ${newRow.value}`)
                }) 
              } else {
                knex(tableName).insert({value: 0})
                .then(ret => {
                    res.send(`pong 0`)
                })
              }
            })
            .catch((err)=> {
              res.status(500).send(`DB error: ${err}`)
            })
        })

  app.get('/pings', (req, res) => {
    knex(tableName).select('*')
        .then((rows) => {
          if(rows.length >= 1){
             res.send(`${rows[0].value}`)
          } else {
             res.status(500).send(`table empty`)
          }
        })
        .catch((err)=> {
           res.status(500).send(`DB error 1: ${err}`)
        })
  })
  app.get('/', (req, res) => {
    res.send(`<h1>Hello Pingpong!</h1>`)
  })

  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
  })
  })
.catch(err => {
    console.log(`DB error 2: ${err}`)
})

  



