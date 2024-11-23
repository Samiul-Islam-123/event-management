const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    clerkID : {
        required : true,
        type : String
    },
    stripe_id : {
        type : String
        },
    timeStamp : {
        type : Date,
        default : Date.now,
    }
})

const UserModel = new mongoose.model('user', UserSchema);

module.exports = UserModel;