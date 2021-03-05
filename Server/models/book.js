const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    year: { type: Date },
    series: String,
    seriesIndex: Number,
    authorName: String
});

module.exports = mongoose.model('Book', bookSchema);
