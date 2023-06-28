const  mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
    ,
       
    des:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('Post',Schema);