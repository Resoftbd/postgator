// Controller for log in and adding user

var mongoose = require('mongoose');
module.exports = function(app) {

    var UserModel = require("../models/user.server.model.js")();

    app.get('/login', function (req, res) {
        var data = req.body;
        console.log(data);
        UserModel.findOne(data, function (err, objects) {
            if (err) {
                res.send(err.message)
                return console.error(err);
            }
            res.send(objects);
            req.session.loggedIn =true;
            req.session.users_id = res.obj._id;
            console.log(res);
            console.log(req.session.users_id);


        });
    });


    app.post('/register', function (req, res) {
        var data = req.body;
        console.log(data);
        UserModel.create(data, function (err, newInstance) {
            if (err) {
                res.send(err.message)
                return console.error(err);
            }
            console.log(newInstance);
            res.send(newInstance);
        });
    });

    app.get('/read', function (req, res) {
        UserModel.find(null, function (err, objects) {
            if (err) {
                res.send(err.message)
                return console.error(err);
            }
            res.send(objects);
        });
    });

    app.post('/update', function (req, res) {
        var data = req.body;
        delete data.$$hashKey;
        UserModel.update({_id: data._id}, data, {multi: true}, function (err, message) {
            if (err) {
                res.send(err.message)
                return console.error(err);
            }
            res.send(message);
        });
    });


    app.post('/delete', function (req, res) {
        var condition = req.body;
        UserModel.remove(condition, function (err, message) {
            if (err) {
                res.send(err.message)
                return console.error(err);
            }
            res.send(message);
        });
    });
}
