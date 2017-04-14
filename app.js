var express = require('express');
var sql = require('mssql');

var app = express();

var port = process.env.PORT || 5000;
var nav = [
            {Link: '/Books', Title:'Books'},
            {Link: '/Authors', Title: 'Authors'},
            {Link: '/Administration', Title: 'Administration'}];

var config = {
    user: 'book',
    password: 'book',
    server: 'localhost',
    database: 'library'
};

sql.connect(config, function(err) {
    console.log(err);
});

var bookRouter = require('./src/routes/book-router')(nav);

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

//gets a response on the particular path - home and render a template
app.get('/', function(req,res) {
    res.render('index', {nav: nav});
});

//gets a response on books patch and uses the bookRouter module to handle the routing
app.use('/Books', bookRouter);

//express listens on the port parameter and the callback determines what it performs
app.listen(port, function(err) {
    console.log('Server listening on port ' + port);
});