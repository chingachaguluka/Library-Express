var express = require('express');


var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));

var nav = [
            {Link: '/Books', Title:'Books'},
            {Link: '/Authors', Title: 'Authors'},
            {Link: '/Admin', Title: 'Admin'}
        ];

var adminRouter = require('./src/routes/admin-routes')(nav);
var bookRouter = require('./src/routes/book-routes')(nav);

app.set('views', './src/views');

app.set('view engine', 'ejs');

//gets a response on the particular path - home and render a template
app.get('/', function(req,res) {
    res.render('index', {nav: nav});
});

//gets a response on books patch and uses the bookRouter module to handle the routing
app.use('/Books', bookRouter);

//uses admin-routes to manage routes to admin
app.use('/admin', adminRouter);

//express listens on the port parameter and the callback determines what it performs
app.listen(port, function(err) {
    console.log('Server listening on port ' + port);
});