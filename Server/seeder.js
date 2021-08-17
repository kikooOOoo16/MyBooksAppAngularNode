'use strict';

const Author = require('./models/author');
const Book = require('./models/book');
const User = require(('./models/user'));

const fs = require('fs');

let getAuthorData = async () => {
    let data = await fs.readFileSync('./Seeds/seeds.json');
    return JSON.parse(data);
}

let seedData = async (numOfRecords) => {
    let authors = [];
    let counter = 0;
    if (!numOfRecords) numOfRecords = 20;

    try {
        authors = await getAuthorData();
        if (authors.length) {
            // delete previous author data in DB
            await Author.deleteMany({});
            // delete previous books data in DB
            await Book.deleteMany({});
            // delete user books list array from DB
            await User.updateMany({},{books: []})

            console.log(`Authors deleted! \nBooks deleted! \nUsers books list deleted!`);

            for (let i = 0; i < numOfRecords; i++) { // create new author instance with empty books array
                let newAuthor = new Author({
                    name: authors[i].name,
                    books: []
                });
                // for each loop to add the authors books from json file to previously created instance
                for await (let book of authors[i].books) {
                    let newBook = new Book({
                        title: book.title,
                        year: new Date(book.year, 0, 1),
                        series: book.series,
                        seriesIndex: book.seriesIndex,
                        authorName: authors[i].name
                    });

                    let savedBook = await newBook.save();

                    await newAuthor.books.push({
                        _id: savedBook._id
                    });
                    counter+=1;
                    if (counter === authors[i].books.length - 1) break;
                }

                await newAuthor.save(); // save

            }
            console.log(`Successfully seeded the DB with ${numOfRecords} new entries.`)
        }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = seedData;
