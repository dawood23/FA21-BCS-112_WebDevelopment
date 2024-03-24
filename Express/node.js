//console.log("geg")

const http=require('http')

const server =http.createServer((req,res)=>{
    if(req.url==='/'){
        res.end("Welcome to the Localhost Server 4000")
    }
    if(req.url==='/about'){
        res.end("This is the about section of the local host server 4000")
    }
     res.end(
         `
         <h1>Page Not Found!!!</h1>
         <p>We cant find the page you are looking for</p>
         `
     )
})

server.listen(4000)