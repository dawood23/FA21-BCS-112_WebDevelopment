const express=require('express')
const server=express()

server.use(express.static("public"));
server.set("view engine","ejs")

server.get('/check',(req,res)=>{
    res.render("check")
})
server.listen(3000)