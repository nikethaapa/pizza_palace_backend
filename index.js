const express=require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// const morgan = require("morgan");
const User = require("./models/Userdata");
const authRoutes = require("./routes/authRoutes")
const pizzaRoutes = require("./routes/pizzaRoutes");
const orderRoutes=require("./routes/orderRoutes")

const app=express()
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://pizza-palace-frontend-gold.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json())
app.use("/api/auth", authRoutes);
app.use("/api/pizza", pizzaRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/upload", require("./routes/upload"));


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
app.get("/",function(req,res){
    res.send("pizza web is running")
})


app.listen(5000,function(){
    console.log("Server started")
})