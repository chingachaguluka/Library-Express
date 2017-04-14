var express = require('express');
var mongodb = require('mongodb').MongoClient;

var bookRouter = express.Router();


//exported function to manage routes for the books
var router = function(nav) {
    bookRouter.route('/')
        .get(function(req, res) {

            var url = 'mongodb://localhost:27017/Library';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('Books');
                collection.find({}).toArray(function(err, results) {
                    console.log(results);
                    res.render('book-list',  {nav: nav, books: results});
                });
            });
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