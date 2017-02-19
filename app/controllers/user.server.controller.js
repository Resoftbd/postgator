// Controller for log in and adding user

var mongoose = require('mongoose');
module.exports = function(app) {

    var UserModel = require("../models/user.server.model.js")();

    app.post('/login', function (req, res) {
        var data = req.body;
        console.log(data);
        UserModel.findOne({users_email: data.users_email,users_password: data.users_password}, function (err, objects) {
            if (err) {
                res.send(err.message)
                return console.error(err);
            }


            else{
                res.send(objects);
                req.session.loggedIn =true;
                req.session.users_id = objects._id;
                console.log(req.session.loggedIn );

                console.log(req.session.users_id);
            }


        });
    });


    app.post('/register', function (req, res) {
        var data = req.body;

       // var data = {users_email: val.users_email,users_password: val.users_password,users_name: val.users_name};
        console.log(val.users_email);

        console.log(data);
       /* var jsonObject = JSON.parse(req.body);
        console.log(jsonObject.users_name);
        var pass = "sasd";
        var data = {
            users_name:jsonObject.users_name,
            users_email:jsonObject.users_email,
            users_password:pass
        };*/

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
