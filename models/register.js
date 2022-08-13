const mongoose = require("mongoose")
const {Schema} = mongoose


const userSchema = new Schema({
    // New Registration
    fname:{
        type: String,
        required: true,
    },
    lname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    newPhone:{
        type: String,
        required: true,
        unique: true
    },
    psw:{
        type: String,
        required: true,
    }, 
    cpsw:{
        type: String,
        required: true
    },
    usertype: {
        type:String,
        default:'user'
    }
})
const User = mongoose.model('User', userSchema)
module.exports = User;