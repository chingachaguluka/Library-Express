var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

var port = process.env.PORT || 5000;

//section to include all middle ware being usd in the project
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'})); //session has to be used before the passport components
require('./src/config/passport')(app);

var nav = [
            {Link: '/Books', Title:'Books'},
            {Link: '/Authors', Title: 'Authors'},
            {Link: '/Admin', Title: 'Admin'}
        ];

//setting up sourse of the views in the project
app.set('views', './src/views');
//setting up the templating engine of the project
app.set('view engine', 'ejs');

//importing routers from the routers files
var adminRouter = require('./src/routes/admin-routes')(nav);
var bookRouter = require('./src/routes/book-routes')(nav);
var authRouter = require('./src/routes/auth-routes')(nav);

//gets a response on the particular path - home and render a template
app.get('/', function(req,res) {
    res.render('index', {nav: nav});
});

//gets a response on books patch and uses the bookRouter module to handle the routing
app.use('/Books', bookRouter);

//uses admin-routes to manage routes to admin
app.use('/admin', adminRouter);

//users auth-routes to manage routing to auth
app.use('/auth', authRouter);

//express listens on the port parameter and the callback determines what it performs
app.listen(port, function(err) {
    console.log('Server listening on port ' + port);
});