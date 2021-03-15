const express = require('express');
const authControllers = require('../controllers/auth');
const middleware = require('../middleware/middleware');

const router = express.Router();

router.post('/signin', authControllers.authSignIn);

router.post('/signup', authControllers.authSignUp);

router.put('/:id', middleware.checkAuth, authControllers.updateUserBooksList);

router.get('/:id', middleware.checkAuth, authControllers.getUserBooksList);

module.exports = router;
