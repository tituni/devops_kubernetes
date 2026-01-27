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
    
    console.log("POST:", note);

    if (note.content === undefined || note.important === undefined) {
         console.log("ERROR: content or important missing")
        return res.status(400).json(
            { error: "check json-data" }
        )
    }

    if (note.content.length > 140) {
        console.log("ERROR: content too long ", note.content)
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

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    knex('notes').where('id', '=', id).del()
        .then(status => {
            console.log("deleted ok")
            res.status(204).end();
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(
                { error: err }
            )
        })
})

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const note = req.body;
    note.date = new Date(note.date);

    // testaa id ja note!!!
    if (isNaN(Number(id)) || note.content === undefined
        || note.date === undefined
        || note.important === undefined) {
        return res.status(400).json(
            { error: "check json-data and id" }
        )
    }

    knex('notes').update(note, ['content', 'important', 'date']).where('id', '=', id)
        .then((response) => {
            console.log(response)
            res.status(204).end();
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(
                { error: err }
            )
        })
})

module.exports = router;