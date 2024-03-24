const express=require('express')
const server=express()

server.use(express.static("public"));

server.get('/',(req,res)=>{
    console.log('here')
    res.status(500).send("hi")
    res.send("expressjs working")
})
server.listen(3000)