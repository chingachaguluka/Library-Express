var express = require('express');
var sql = require('mssql');

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

var routes = function(nav) {

    bookRouter.route('/')
        .get(function(req, res) {
            var request = new sql.Request();
            request.query('select * from books', function(err, recordset) {
                console.log(recordset.recordset);
                res.render('book-list', {nav: nav, books: recordset.recordset});
            });

            //new sql.Request().query('select * from books', function(err, results) {
            //    console.dir(results);
            //});
        });

    bookRouter.route('/:id')
        .all(function (req, res, next) {
            var id = req.params.id;
            var ps = new sql.PreparedStatement();
            ps.input('id', sql.VarChar(50));
            ps.prepare('select * from books where id = @id', function(err) {
                ps.execute({id: id}, function(err, recordset) {
                    if (!recordset) {
                        res.status(404).send('Book not found');
                    }
                    else {
                        req.book = recordset.recordset[0];
                        next();
                    }
                });
            });
        })
        .get(function(req, res) {
            res.render('book-view',  {nav: nav, book: req.book});
        });
    return bookRouter;
};
module.exports = routes;