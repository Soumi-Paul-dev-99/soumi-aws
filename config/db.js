const mongoose = require("mongoose");
const connectDB = async ()=>{
 try {
         const conn = await mongoose.connect(process.env.DATABASE)
    console.log(`connection successfull ${conn.connection.host}`)
    } catch (error) {
        console.log(`database not connected${error.message}`)
    }
}
module.exports = connectDB;


