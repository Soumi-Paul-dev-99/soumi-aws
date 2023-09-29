const userRoutes = require("../routers/userRoutes");
const app = require("../app");
const User = require("../models/userModels");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

exports.register = async (req,res)=>{
try {
    console.log("bodyy",req.body)
    const {name,email,password}= req.body;
    if(!(name && email && password)){
      return  res.status(403).send("All filed are required");
    }

const user = User.findOne({email});
if(email){
    return res.status(400).send("email address already exits",user)
}

const encryptPassword = await bcrypt.hash(password,10)

const users = await User.create({
    name,email,password:encryptPassword,
  
})


const token=  jwt.sign(
    {user_id:user._id,email},
    process.env.TOKEN_KEY,{
        expiresIn:"3h"
    }
)
users.token = token;
} catch (error) {
    res.status(500).json({
        success:true,
        message:"not registered successfully",
        error
    })
}
}