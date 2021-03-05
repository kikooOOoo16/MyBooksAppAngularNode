const express = require('express');
const Author = require('../models/author');

const router = express.Router();

const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

router.get('', (req, res) => {
    let resultSet = [];
    let authorQuery = Author.find();
    if (req.query.searchAuthorQuery && req.query.searchAuthorQuery !== '') {
        const regex = RegExp(escapeRegex(req.query.searchAuthorQuery), 'gi');
        authorQuery = Author.find({name: regex});
    } else if (req.query.pageSize > 0 && req.query.page) {
        const currentPage = +req.query.page;
        const pageSize = +req.query.pageSize;
        authorQuery
            .skip((currentPage - 1) * pageSize)
            .limit(pageSize)
    }
    authorQuery.then(authorsResponse => {
        authorsResponse.map(author => {
            resultSet.push({
                id: author._id,
                name: author.name,
                numOfBooks: author.books.length
            });
        });
        return Author.count();
    }).then(numOfAuthors => {
        res.status(200).json({
            message: 'Authors fetched successfully.',
            authors: resultSet,
            numOfAuthors: numOfAuthors
        });
    });
});

router.get('/:id', (req, res) => {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Author.findById(req.params.id).populate('books').then(authorResult => {
            if (authorResult) {
                const resultSet = {
                    id: authorResult._id,
                    name: authorResult.name,
                    books: [...authorResult.books]
                }
                res.status(200).json({
                    message: 'Author fetched successfully.',
                    author: resultSet
                })
            } else {
                res.status(404).json({
                    message: 'No author matched that query.'
                })
            }
        })
    } else {
        res.status(404).json({
            message: 'Invalid id input.'
        })
    }
})

module.exports = router;
