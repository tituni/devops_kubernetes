var express = require('express');
var router = express.Router();

const knex = require('../utils/dbConnection');

const bcrypt = require('bcryptjs')

router.post('/', (req, res, next) => {
    const user = req.body;
    const saltRounds = 10;
    console.log(user);

    if (user.username === undefined || user.password === undefined || user.email === undefined) {
        return res.status(400).json(
            { error: "check json-data" }
        )
    }

    // hash password!!!!
    bcrypt.hash(user.password, saltRounds)
        .then((passwordHash) => {
            const newUser = {
                username: user.username,
                password: passwordHash,
                email: user.email
            }
            // TÄSTÄ LÄHTEE KNEX!!
            knex('users').insert(newUser)
                .then(() => {
                    console.log("register onnistui")
                    res.status(204).end()
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(
                        { error: err }
                    )
                })
        })
})

module.exports = router;