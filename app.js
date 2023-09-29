const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const User = require("./models/userModels");
const userRoutes = require("./routers/userRoutes");
const app = express();
const port = process.env.PORT || 5000
connectDB();

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))

app.use("/api/users",userRoutes);

app.listen(port,()=>{
    console.log(`server running on the port http://localhost:${port}`)
})