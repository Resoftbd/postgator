// Controller for log in and adding user

var mongoose = require('mongoose');
module.exports = function(app) {

    var UserModel = require("../models/user.server.model.js")();
    app.get('/',function(req,res){
        sess = req.session;
    //Session set when user Request our app via URL
        if(sess.loggedIn==true) {
            /*
             * This line check Session existence.
             * If it existed will do some action.
             */
            res.redirect('/menu');
        }
        else {
            res.render('index.html');
        }
    });
    app.get('/menu',function(req,res){
        sess = req.session;
        //Session set when user Request our app via URL
        if(sess.loggedIn) {
            /*
             * This line check Session existence.
             * If it existed will do some action.
             */
            res.render('menu.html');
        }
        else {
            res.render('index.html');
        }
    });
    app.post('/login', function (req, res) {
        var data = req.body;
        console.log(data);
        UserModel.findOne({users_email: data.users_email,users_password:data.users_password}, function (err, objects) {

            if (err) {
                res.send(err.message);
                return console.error(err);
            }
            else {
                if (objects) {
                    res.send(objects);
                    req.session.loggedIn = true;
                    req.session.users_id = objects._id;
                    console.log(req.session.loggedIn);
                    console.log(req.session.users_id);

                }

            }
        });
    });


    app.post('/register', function (req, res) {
       var data = req.body;

        console.log(data);
        UserModel.create(data, function (err, objects) {
            if (err) {
                res.send(err.message);
                return console.error(err);
            }
            console.log(objects);
            res.send(objects);

            req.session.loggedIn = true;
            req.session.users_id = objects._id;
            console.log(req.session.loggedIn);
            console.log(req.session.users_id);
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
