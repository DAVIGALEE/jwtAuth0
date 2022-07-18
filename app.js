require("dotenv").config()
require("./config/database").connect()
const express = require("express")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const app = express()

app.use(express.json())

module.exports = app

//importing user context
const User = require('./model/user')
app.post("/register",async (req,res)=>{
    console.log(req.body)
    try{
        const{first_name,last_name,email,password}=req.body
        

        if(!(email&&password&&first_name&&last_name)){
            res.status(400).send("All input is required")
        }

        const oldUser = await User.findOne({email})
        
        if(oldUser){
            return res.status(409).send("User already exists")
        }

       const encrypted_pass = await bcrypt.hash(password,10)
       
       const user = await User.create({
        first_name,
        last_name,
        password:encrypted_pass,
        email:email.toLowerCase(),

       })

    //    const token = jwt.sign(
    //     {user_id:user._id,email},
    //     process.env.TOKEN_KEY,
    //     {
    //         algorithm: "HS256",
    //         expiresIn:"2h",
    //     }
    //    )
    //    user.token = token;
        console.log(user._id)
       res.status(201).json(user)
    }catch(error){
        console.log(error)
    }


})
app.post("/login", async (req, res) => {
  try{
    const{first_name,password,email} = req.body;
    const foundUser = await User.findOne({first_name})
    if(foundUser&&(await bcrypt.compare(password,foundUser.password))){
        const token = jwt.sign(
            {user_id:foundUser._id,email},
            process.env.TOKEN_KEY,
        {
            algorithm: "HS256",
            expiresIn:"2h",
        }
        )
        foundUser.token = token
        res.status(200).json(foundUser);
    }
    res.status(400).send("Invalid Credentials")
  }catch(error){
        console.log(error)
  }
});

const verify = require("./middleware/auth")

app.get("/welcome",verify,(req,res)=>{
    res.status(200).send("Welcome 🙌 ");
})