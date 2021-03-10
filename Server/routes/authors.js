const express = require('express');
const authorsController = require('../controllers/authors');

const router = express.Router();


router.get('', authorsController.getAuthors);

router.get('/:id', authorsController.getAuthor);

module.exports = router;
