var express = require('express');
var path = require('path');
var app = express();
var imageRouter = require('./routes/imageRouter');

app.use(express.static(path.join(__dirname, 'build')));

app.use('/image', imageRouter);

module.exports = app;
