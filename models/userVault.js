const mongoose = require('mongoose')
const vaultSchema = new mongoose.Schema({
    vaultName : {
        type : String
    },
    category : {
        type : String,
        enum : ['Social' , 'Work']
    },
    username : {
        type : String
    },
    password : {
        type : String
    },
    notes : {
        type : String
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }
}, {timestamps : true})

module.exports = mongoose.model('vaults' , vaultSchema);