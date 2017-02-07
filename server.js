/**
 * Created by Resoft on 2/7/2017.
 */
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + '/client'));
app.use(cors({}));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

var mongoose = require('mongoose');
mongoose.connect("mongodb://root:resoft@127.0.0.1:27017/admin");


var UserSchema = new mongoose.Schema({
    users_email: String,
    users_name: String,
    users_password: String
});
var UserModel = mongoose.model('Users',UserSchema);


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



app.listen(3000, function(){
    console.log('Postgator is listening on port 3000!');
});
