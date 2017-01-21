/**
 * Created by root on 1/18/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    username : String,
    passport : String,
    name :String,
    email : String
})

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('user',User)