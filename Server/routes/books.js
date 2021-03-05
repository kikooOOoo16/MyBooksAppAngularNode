const express = require('express');
const Book = require('../models/book');

const router = express.Router();

router.get('', (req, res) => {
    Book.find({}).then(fetchedBooks => {
        if (fetchedBooks) {
            res.status(200).json({
                message: 'Books fetched successfully.',
                books: fetchedBooks
            })
        } else {
            res.status(404).json({
                message: 'No books matched that query'
            })
        }
    })
})

module.exports = router;
