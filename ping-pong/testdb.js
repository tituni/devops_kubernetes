const options = {
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'example',
        database: 'postgres'
    }
}

const knex = require('knex')(options);

knex.on('query', console.log);  // SQL-muoto

knex.from('testing').select("*")
    .then((rows) => {
        console.log("starting test");
        console.log(rows);
    })
    .catch((err) => {
        console.log(err); 
        throw err 
    })
    .finally(() => {
        console.log("close database connection")
        knex.destroy();
    });