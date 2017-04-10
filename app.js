var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.static('src/views'));

//gets a response on the particular path - home and return a message in the send to
//the browser
app.get('/', function(req,res){
    res.send('Welcome to home page');
});

//gets a response on the particular path - home and return a message in the send to
//the browser
app.get('/books', function(req,res){
    res.send('Welcome to books section');
});

//express listens on the port parameter and the callback determines what it performs
app.listen(port, function(err){
    console.log('Server listening on port ' + port);
});