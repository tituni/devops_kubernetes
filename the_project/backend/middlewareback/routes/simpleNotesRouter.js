var express = require('express');
var router = express.Router();

const knex = require('../utils/dbConnection');

router.get('/', (req, res, next) => {
knex('notes').select('*')
        .then((rows) => {
            console.log(rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log('SELECT * NOTES failed')
            res.status(500).json(
                { error: err }
            )
        })
})

router.post('/', (req, res, next) => {
    const note = req.body;
    console.log(note);
    if (note.content === undefined || note.important === undefined) {
        return res.status(400).json(
            { error: "check json-data" }
        )
    }

    note.date = new Date(note.date);

    knex('notes').insert(note).returning('id') //postgres!!!*/
        .then(id_arr => {
            console.log(id_arr);
            note.id = id_arr[0].id; //postgress!!!
            // note.id = id_arr[0];
            res.json(note);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(
                { error: err }
            )
        })
})

module.exports = router;