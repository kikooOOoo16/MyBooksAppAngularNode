const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');

exports.authSignIn = (req, res, next) => {
    let fetchedUser;
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.status(401).json({
                    message: 'Invalid authentication credentials!'
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password)
                .then(result => {
                    if (!result) {
                        return res.status(401).json({
                            message: 'Invalid authentication credentials!'
                        });
                    }
                    const token = jsonwebtoken.sign(
                        {
                            email: fetchedUser.email,
                            userId: fetchedUser._id
                        }, process.env.JSON_WEB_TOKEN_SECRET,
                        {expiresIn: '1h'}
                    )
                    res.status(200).json({
                        message: 'Authentication was successful!',
                        token: token,
                        expiresIn: 3600,
                        userId: fetchedUser._id,
                        email: fetchedUser.email
                    })
                }).catch(err => {
                    return res.status(401).json({
                        message: 'Invalid authentication credentials!'
                    });
                });
        });
}

exports.authSignUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'User created successfully!'
                    })
                }).catch(err => {
                res.status(500).json({
                    message: 'There is already an account associated with this email address!'
                });
            });
        });
}

exports.updateUserBooksList = (req, res, next) => {
    let books = [];
    if (req.body.booksList) {
        new Promise((resolve, reject) => {
            req.body.booksList.forEach((book, index) => {
                books.push({
                    book: book.id,
                    status: book.status ? book.status : ''
                });
                if (index === req.body.booksList.length - 1) {
                    resolve();
                }
            });
        }).then(() => {
            User.findByIdAndUpdate(req.params.id, {books: [...books]})
                .then(() => {
                    books = [];
                    res.status(200).json({
                        message: 'Successfully saved user books list to DB.'
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'Failed to save user\'s books list!'
                    });
                })
        })
    }
}


exports.getUserBooksList = (req, res, next) => {
    User.findById(req.params.id).populate('books.book').exec((err, result) => {
        if (result) {
            res.status(200).json({
                message: 'Successfully retrieved user\'s books list.',
                booksList: result.books
            })
        } else {
            res.status(404).json({
                message: 'Failed to retrieve user\'s books list.'
            })
        }
    })
}
