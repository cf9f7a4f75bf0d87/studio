var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require("multer");


var routes = require('./routes/index');
var users = require('./routes/users');
var user=require('./routes/user');
var admin=require('./routes/admin');
var test = require('./routes/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//***********use session************
app.use(session(
    {
        resave:false,
        saveUninitialized:false,
        secret: 'keyboard cat'}
));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//2015/02/09  上传..
//app.use(require('connect-multiparty')());
app.use(multer({
    dest: './public/uploads/',
    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
    }
}))

app.use(bodyParser({
    keepExtensions:true,
    limit:10000000,  // 10M limit
    defer:true
}))


//login control.
app.use(function(req,res,next){
    var pass = req.session.pass;
    var url=req.originalUrl;
    console.log(req.session.control);
    console.log(url);
    var admin = /^\/admin\/login*/;
    var user = /^\/user\/login*/;
    if(!req.session.control &&(user.test(url)&&admin.test(url))){
        res.writeHead(302,{'Location':'/user/login'});
        res.end();
    }else{
        next();
    }

})

//visit control
app.use(function(req,res,next){
    var control = req.session.control;
    var pass =req.session.pass;
    var url = req.originalUrl;
    var admin = /^\/admin*/;
    var user = /^\/user*/;
    if(req.session.control){
        if(admin.test(url)&&pass=="ad_ok"){next();}
        else if(user.test(url)&&pass=="user_ok"){next();}
        else {
            res.writeHead(302,{'Location':'/user/login'});
            res.end();
        }}
    else{next();}

})
app.use('/', routes);
app.use('/users', users);
app.use('/user',user);
app.use('/admin',admin);
app.use('/test',test);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
