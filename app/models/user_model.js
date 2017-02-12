var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + '/public/views'));
app.use(express.static(__dirname + '/public'));
app.use(cors({}));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

var mongoose = require('mongoose');
mongoose.connect("mongodb://root:12345@127.0.0.1:27017/admin");
module.exports = new mongoose.Schema({
    users_email: String,
    users_name: String,
    users_password: String
});
