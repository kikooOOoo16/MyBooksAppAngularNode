const path = require('path');

exports.getIndexPage = (req, res, next) => {
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
}

exports.handleBadRequest = (req, res, next) => {
    res.sendFile(path.resolve(__dirname + '/../public/400.html'))
}
