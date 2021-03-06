const express = require('express');
const booksController = require('../controllers/books');

const router = express.Router();

router.get('', booksController.getBooksByQuery);

module.exports = router;
