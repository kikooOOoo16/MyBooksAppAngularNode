const mongoose = require('mongoose');

// setup mongoose Atlas connection
mongoose.connect(process.env.MLAB_DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => {
        console.log('Connected to DB!')
    })
    .catch(() => {
        console.log('Connection failed.');
    });