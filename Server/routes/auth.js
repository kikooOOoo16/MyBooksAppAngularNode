const express = require('express');
const authControllers = require('../controllers/auth');

const router = express.Router();

router.post('/signin', authControllers.authSignIn);

router.post('/signup', authControllers.authSignUp);

module.exports = router;
