var express = require('express');

var app = express();

var port = process.env.PORT || 5000;
var bookRouter = express.Router();

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

//gets a response on the particular path - home and render a template
app.get('/', function(req,res) {
    //res.render('index', {bookId: '4', title: 'The New Express Developer', price: '345.66', author: 'Chinga Chaguluka', genre: 'Technology'});
    res.render('index', {nav: [
            {Link: '/Books', Title:'Books'},
            {Link: '/Authors', Title: 'Authors'}]
    });
});

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

bookRouter.route('/Single')
    .get(function(req, res) {
        res.send('This is the book view page');
    });

app.use('/Books', bookRouter);

//gets a response on the particular path - home and return a message in the send to
//the browser
app.get('/books', function(req,res) {
    res.send('Welcome to books section');
});

//express listens on the port parameter and the callback determines what it performs
app.listen(port, function(err) {
    console.log('Server listening on port ' + port);
});