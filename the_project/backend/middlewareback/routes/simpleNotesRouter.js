var express = require('express');
var router = express.Router();

let notes = []

router.get('/', (req, res, next) => {
    console.log("get called")
    res.json(notes);
})

router.post('/', (req, res, next) => {
    console.log("post called")
    notes = notes.concat(req.body)
    res.json(req.body);
})

module.exports = router;