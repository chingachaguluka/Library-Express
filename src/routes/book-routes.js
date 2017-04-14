var express = require('express');

var bookRouter = express.Router();

//books in the library
var books = [
    {
        id: '1',
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        read: 'False'
    },
    {
        id: '2',
        title: 'Les Miserables',
        genre: 'Historical Fiction',
        author: 'Victor Hugo',
        read: 'False'
    },
    {
        id: '3',
        title: 'The Time Machine',
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: 'False'
    }
];

//exported function to manage routes for the books
var router = function(nav) {
    bookRouter.route('/')
        .get(function(req, res) {
            res.render('book-list',  {nav: nav, books: books});
        });

    bookRouter.route('/:id')
        .get(function(req, res) {
            var id = req.params.id;
            res.render('book-view',  {nav: nav, book: books[id]});
        });

    //return the current route that is slected
    return bookRouter;
};
module.exports = router;