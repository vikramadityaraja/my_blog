const mongoose = require('mongoose');


const template = new mongoose.Schema({
    Username : {
        type:String,
        required:true
    },
    Email : {
        type:String,
        required:true
    },
    Password : {
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model('register',template)