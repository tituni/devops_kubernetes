var express = require('express');
var router = express.Router();

const knex = require('../utils/dbConnection');

router.get('/', (req, res, next) => {
    // UUSI
    const userId = res.locals.auth.userId;

    knex('notes').select('*').where('user_id', '=', /*decodedToken.id*/userId)
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
    // UUSI
    const userId = res.locals.auth.userId;

    const note = req.body;
    console.log(note);
    if (note.content === undefined || note.date === undefined || note.important === undefined) {
        return res.status(400).json(
            { error: "check json-data" }
        )
    }

    note.user_id = /*decodedToken.id*/userId;
    note.date = new Date(note.date);

    knex('notes').insert(note)/*.returning('id') //postgres!!!*/
        .then(id_arr => {
            console.log(id_arr);
            //note.id = id_arr[0].id; //postgress!!!
            note.id = id_arr[0];
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
    // UUSI
    const userId = res.locals.auth.userId;
    const id = req.params.id;
    console.log(id);

    knex('notes').where('user_id', "=", /*decodedToken.id*/userId).andWhere('id', '=', id).del()
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
    // UUSI
    const userId = res.locals.auth.userId;

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

    // ei anna muuttaa id:tä 
    if (note.user_id !== /*decodedToken.id*/userId) {
        return res.status(401).json(
            { error: "check json-data and id 2" }
        )
    }

    knex('notes').update(note, ['content', 'important', 'date']).where('user_id', "=", /*decodedToken.id*/userId).andWhere('id', '=', id)
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