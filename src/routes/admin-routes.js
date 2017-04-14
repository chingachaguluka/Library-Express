var express = require('express');
var mongodb = require('mongodb').MongoClient;

var adminRouter = express.Router();

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

var router = function(nav) {

    adminRouter.route('/addBooks')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/Library';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('Books');
                collection.insertMany(books, function(err, results) {
                    res.send(results);
                    db.close();
                });
            });

            //res.send('Inserting books');
        });

    return adminRouter;
};

module.exports = router;
