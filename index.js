const express=require("express")
const {Server}=require("socket.io")
const http=require("http")
const app=express()
//Explore namespaces and room//
const server=http.createServer(app)

app.get("/",(req,res)=>{
    res.send("Base end point")
})

server.listen(8000,()=>{
    console.log("Server is listening on port number 8000")
})
const io=new Server(server)
let count=0//for how many client is there
io.on("connection",(socket)=>{///connection
      count++
     socket.broadcast.emit("newuser",count)///want to send to everyone except that client // this the best method 
    ///want to send to everyone except that client // this the best method 
    // io.emit("newuser",count)
    ///send everyone 
    console.log("Current count:"+count)
     socket.emit("xyz","hello from server")
     /// emiter
     socket.on("chat",(msg)=>{
        console.log(msg)
        socket.broadcast.emit("ChatwithFriend",msg)
     })
     socket.on("disconnect",()=>{
        count--
        console.log("Current count:"+count)///connection 
     })
})
///Online people How many client are currently in our server 

///this is tramiter 
