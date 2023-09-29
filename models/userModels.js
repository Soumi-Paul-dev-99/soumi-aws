const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

name:{
    type:String,
    trim:true,
   
},
email:{
    type:String,
    trim:true,
 
    unique:true
},
password:{
    type:String,
  
},

images:{
    type:String,
},
url:{
    type:String
},
token:{
    type:String,
},

})

const User =  mongoose.model("user",userSchema);
module.exports = User;