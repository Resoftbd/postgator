var mongoose      = require("mongoose");

module.exports = function() {

    var UserSchema = new mongoose.Schema({
        users_email: String,
        users_name: String,
        users_password: String,
        users_fb_id: { type: String, default:null },
        users_fb_name: { type: String, default:null }
    });
    var UserModel = mongoose.model('Users',UserSchema);
    return UserModel;
}