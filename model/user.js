const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    first_name:{type:String, default:null,unique:true},
    last_name:{type:String, default:null},
    email:{type:String,unique:true},
    password:String,
    token:String,
})
module.exports = mongoose.model("User",userSchema);