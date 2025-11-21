const mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    confirmPassword : {
        type : String,
        required : true
    },
    category : {
        type : String,
        enum : ['Social' , 'Work']
    },
    lastLogin : {
        type : Date
    }
} , {timestamps : true} )

module.exports = mongoose.model('users' , userSchema)