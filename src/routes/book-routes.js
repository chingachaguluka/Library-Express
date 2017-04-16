var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var bookRouter = express.Router();


//exported function to manage routes for the books
var router = function(nav) {
    //redirect users to the index route when they are not logged in
    bookRouter.use(function(req, res, next){
        if (!req.user) {
            res.redirect('/');
        }
    });

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
            var id = new objectId(req.params.id);
            var url = 'mongodb://localhost:27017/Library';

            mongodb.connect(url, function(err, db) {
                var collection = db.collection('Books');
                collection.findOne({_id: id}, function(err, results) {
                    console.log(results);
                    res.render('book-view',  {nav: nav, book: results});
                });
            });
        });

    //return the current route that is slected
    return bookRouter;
};
module.exports = router;