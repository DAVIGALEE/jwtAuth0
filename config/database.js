const mongoose = require("mongoose")

const {MONGO_URI} = process.env

exports.connect = () =>{
    mongoose.connect(MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("Connected to database")
    })
    .catch((err) =>{
        console.log("Failed to connect database")
        console.log(err)
        process.exit(1);
    })
}