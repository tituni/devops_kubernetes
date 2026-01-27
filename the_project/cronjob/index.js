require('dotenv').config()

const checkTable = require('./utils/checkTable.js')
const knex = require('./utils/dbConnection.js')

const url = process.env.URL;

try {
    fetch(url)
    .then(response => {
        console.log("fetch", url)
        const new_content = response.url
        console.log("fetch response", response.url)
        const new_note = {
                content: new_content ? new_content : "page not found", 
                date: new Date(), 
                important: false
        }
        checkTable()
        .then(res => 
            knex('notes').insert(new_note)
            .then(() => 
                console.log("more data inserted")
            )
            .catch((err) => { 
            console.log("insert failed", err) 
            .finally(() => {
                knex.destroy();
            });
        })   
        )
        .catch((err) => { 
            console.log("checktable failed", err) 
        })    
    })
    .catch((err) => { 
        console.log("featch error", err); 
    })

}
catch (err) {
    console.log("ERROR IN CRON JOB", err)
}
