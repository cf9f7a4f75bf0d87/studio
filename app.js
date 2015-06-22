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
    var url=req.originalUrl;
    console.log(url+"aaaaaa");
    var admin = /^\/admin\/login*/;
    var user = /^\/user\/login*/;
    var upload = /^\/test\/uploads*/;
    if(/^\/show$/.test(url)||/\/favicon.ico/.test(url)){next();}  // special url should pass first , but these are not enough , will add more later.. or change another method.
    else if(req.session.control||false||upload.test(url)){
        console.log("pass method 1..");
        next();
    }
    else if( user.test(url)||admin.test(url)){
        console.log("pass method 2..");
        next();}
    else {
        console.log("not pass method 3..");
        res.writeHead(302,{'Location':'/user/login'});
        res.end();
    }
});

//visit control
app.use(function(req,res,next){
    var pass =req.session.pass;
    var url = req.originalUrl;
    var admin = /^\/admin*/;
    var user = /^\/user*/;
    var upload = /^\/test\/uploads*/;

    if(req.session.control||false) {  //when login, will get a control flag to start to execute visit-control function.
        if(upload.test(url)||/^\/favicon.ico$/.test(url)||/\/^show$/.test(url)){
            next();
        }
        else if (admin.test(url) && pass == "ad_ok") {
            next();
        }
        else if (user.test(url) && pass == "user_ok") {
            next();
        }
        else {
            res.writeHead(302, {'Location': '/user/404'});
            res.end();
        }
    }else{ // 这是啥，我也不清楚。。 放行了登录控制的重定向。。其他呢？
        next();
    }
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
