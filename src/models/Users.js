const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    name: String,
    age: Number,
})

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;