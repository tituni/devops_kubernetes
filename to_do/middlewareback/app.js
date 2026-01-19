var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var loginRouter = require('./routes/loginRouter');
var registerRouter = require('./routes/registerRouter');
var notesRouter = require('./routes/notesRouter');

// middlewares:
var isAuthenticated = require('./middlewares/auth');  // AUTH
var validateSchema = require('./middlewares/validate');

// schemas:
var userschema = require('./schemas/userSchema.json');
var noteschema = require('./schemas/noteSchema.json');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/login', loginRouter);
app.use('/register', validateSchema(userschema), registerRouter);
app.use('/notes', isAuthenticated, validateSchema(noteschema), notesRouter);

module.exports = app;
