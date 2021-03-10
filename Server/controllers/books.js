const Book = require('../models/book');
const escapeRegex = require('../shared');

exports.getBooksByQuery = (req, res) => {
    let booksQuery = Book.find();
    if (req.query.searchBooksByTitleQuery) {
        const regex = RegExp(escapeRegex(req.query.searchBooksByTitleQuery), 'gi');
        booksQuery = Book.find({title: regex })
    } else if (req.query.searchBooksBySeriesQuery) {
        const regex = RegExp(escapeRegex(req.query.searchBooksBySeriesQuery), 'gi');
        booksQuery = Book.find({series: regex })
    }
    booksQuery.then(fetchedBooks => {
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
    });
}
