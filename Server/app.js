const express = require('express');

const bodyParser = require('body-parser');
const seeder = require('./seeder');

const authorRoutes = require('./routes/authors');
const booksRoutes = require('./routes/books');
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');

const app = express();

//Environment variables config
require('dotenv').config();

// just run the file and connect to our DB
require('./db/mongoose');

// expose public folder
app.use(express.static(__dirname + "/public"));

// setup body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Seed DB
// seeder(100);

// Allow CORS communication
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

// Define routes
app.use('/authors', authorRoutes);
app.use('/books', booksRoutes);
app.use('/auth', authRoutes);
app.use('', indexRoutes);


module.exports = app;
