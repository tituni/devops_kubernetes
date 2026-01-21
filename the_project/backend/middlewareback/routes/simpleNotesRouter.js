var express = require('express');
var router = express.Router();

let notes = []

router.get('/', (req, res, next) => {
    res.json(notes);
})

router.post('/', (req, res, next) => {
    notes = notes.concat(req.body)
    res.json(note);
})

module.exports = router;