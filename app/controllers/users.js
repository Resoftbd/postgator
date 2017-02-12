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
var schema = require('../models/user_model');

var UserModel = mongoose.model('Users',schema);

app.post('/register', function(req, res){
    var data = req.body;
    console.log(data);
    UserModel.create(data, function(err, newInstance){
        if(err){
            res.send(err.message)
            return console.error(err);
        }
        console.log(newInstance);
        res.send(newInstance);
    });
});

app.get('/read', function(req, res){
    UserModel.find(null, function(err, objects){
        if(err){
            res.send(err.message)
            return console.error(err);
        }
        res.send(objects);
    });
});

app.post('/update', function(req, res){
    var data = req.body;
    delete data.$$hashKey;
    UserModel.update({_id: data._id}, data, {multi: true}, function(err, message){
        if(err){
            res.send(err.message)
            return console.error(err);
        }
        res.send(message);
    });
});


app.post('/delete', function(req, res){
    var condition = req.body;
    UserModel.remove(condition, function(err, message){
        if(err){
            res.send(err.message)
            return console.error(err);
        }
        res.send(message);
    });
});

