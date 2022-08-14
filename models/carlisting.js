const mongoose = require("mongoose")
const {Schema} = mongoose


const carSchema = new Schema({
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
   
})
const Car = mongoose.model('User', carSchema)
module.exports = Car;