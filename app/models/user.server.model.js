var mongoose      = require("mongoose");

module.exports = function() {

    var UserSchema = new mongoose.Schema({
        users_email: String,
        users_name: String,
        users_password: String
    });
    var UserModel = mongoose.model('Users',UserSchema);
    return UserModel;
}