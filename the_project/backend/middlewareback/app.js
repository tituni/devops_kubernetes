var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

var checkTable = require('./utils/checkTable')

var loginRouter = require('./routes/loginRouter');
var registerRouter = require('./routes/registerRouter');
var notesRouter = require('./routes/notesRouter');

var simpleNotesRouter = require('./routes/simpleNotesRouter');

// enabling CORS for some specific origins only.
let corsOptions = {
   origin : ['http://localhost:3005'],
}

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
app.use(cors(/*corsOptions*/))

checkTable()
.then(ret => {
   //app.use('/api/login', loginRouter);
   //app.use('/api/register', validateSchema(userschema), registerRouter);
   app.use('/api/notes', /* isAuthenticated, validateSchema(noteschema), notesRouter*/ simpleNotesRouter);
})
.catch(err => {
    console.log(`DB error 2: ${err}`)
    return
})

module.exports = app;
