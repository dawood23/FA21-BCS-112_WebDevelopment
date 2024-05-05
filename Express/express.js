const express=require('express')
const server=express()
const mongoose = require("mongoose");

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

