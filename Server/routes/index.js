const express = require('express');
const router = express.Router();

const indexControllers = require('../controllers/index');

router.get('', indexControllers.getIndexPage);

router.get('*', indexControllers.handleBadRequest);

module.exports = router;