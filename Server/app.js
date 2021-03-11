const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const seeder = require('./seeder');

const authorRoutes = require('./routes/authors');
const booksRoutes = require('./routes/books');
const authRoutes = require('./routes/auth');
const app = express();

//Environment variables config
require('dotenv').config();


// setup mongoose Atlas connection
mongoose.connect(process.env.MLAB_DATABASE_URL,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to DB!')
    })
    .catch(() => {
        console.log('Connection failed.');
    });

// setup body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Seed DB
seeder(60);

// Allow CORS communication
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
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



module.exports = app;
