var express = require('express');

var bookRouter = express.Router();

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

bookRouter.route('/')
    .get(function(req, res) {
        res.render('book-list',  {nav: [
            {Link: '/Books', Title:'Books'},
            {Link: '/Authors', Title: 'Authors'}],
                books: books
            });
    });

bookRouter.route('/:id')
    .get(function(req, res) {
        var id = req.params.id;
        res.render('book-view',  {nav: [
            {Link: '/Books', Title:'Books'},
            {Link: '/Authors', Title: 'Authors'}],
                book: books[id]
            });
    });

module.exports = bookRouter;