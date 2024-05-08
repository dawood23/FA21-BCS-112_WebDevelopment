const express=require('express')
const server=express()
const mongoose = require("mongoose");

const func=async()=>{
    const connection= await mongoose
      .connect("mongodb+srv://dawood:03348757377d@cluster0.nlusybm.mongodb.net/test")
      .then(() => {
        console.log("DB Connected");
      })
      .catch((err) => {
        console.log("Unable to connect",err);
      });
 
    }

func().then(()=>{
server.use(express.static("public"))
server.set("view engine","ejs")

server.get('/check',(req,res)=>{
    res.render("check")
})

const itemRouter=require('./routes/item')

server.use("/items",itemRouter)

server.listen(3000,()=>{
    console.log("Started Listening At 3000")
}
)
})
