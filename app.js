var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

//gets a response on the particular path - home and render a template
app.get('/', function(req,res) {
    res.render('index', {title: 'Welcome to Home in EJS', list: ['a', 'b', 'c']});
});

//gets a response on the particular path - home and return a message in the send to
//the browser
app.get('/books', function(req,res) {
    res.send('Welcome to books section');
});

//express listens on the port parameter and the callback determines what it performs
app.listen(port, function(err) {
    console.log('Server listening on port ' + port);
});