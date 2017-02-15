/**
 * Created by Resoft on 2/7/2017.
 */
// Adding dependency
var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var cors          = require('cors');
var multer        = require('multer');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');

mongoose.connect("mongodb://root:12345@127.0.0.1:27017/admin");  //connect to database
//For express
app.use(express.static(__dirname + '/public/views'));
app.use(express.static(__dirname + '/public'));
app.use(cors({}));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
multer();
app.use(cookieParser());
app.use(session({
    secret: 'resoft secret postgator',
    resave: true,
    saveUninitialized: true
}));


require("./app/app.js")(app);   //Including node controller with express

app.listen(3000, function(){
    console.log('Postgator is listening on port 3000!');
});
