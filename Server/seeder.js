'use strict';

const Author = require('./models/author');
const Book = require('./models/book');

const fs = require('fs');

let seedData = (numOfRecords) => {
    if (!numOfRecords) numOfRecords = 20;
    let data = fs.readFileSync('./Seeds/seeds.json');
    let authors = JSON.parse(data);

    Author.remove({}, err => {
        if (err) {
            console.log(err);
        } else {
            console.log('Removed authors from DB');
            Book.remove({}, err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Removed books from DB');
                }
                // Clear Author and Book collections in DB
            }).then(() => {
                for (let i = 0; i < numOfRecords; i++) {
                    let newAuthor = new Author({
                        name: authors[i].name,
                        books: []
                    })
                    // Use Promise to make sure the authors book exists in the DB before saving it's reference in the Authors books array.
                    new Promise((resolve, reject) => {
                        authors[i].books.forEach((book, index) => {
                            let newBook = new Book({
                                title: book.title,
                                year: new Date(book.year, 0, 1),
                                series: book.series,
                                seriesIndex: book.seriesIndex,
                                authorName: authors[i].name
                            });
                            newBook.save()
                                .then(savedBook => {
                                    newAuthor.books.push({
                                        _id: savedBook._id
                                    })
                                }).then(() => {
                                if (index === authors[i].books.length - 1) {
                                    resolve();
                                }
                            });
                        })
                    }).then(() => {
                        newAuthor.save();
                    })
                }
            }).then(() => console.log(`Seeded the DB successfully.`));
        }
    });
}

module.exports = seedData;
