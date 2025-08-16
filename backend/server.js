
const express = require("express");
const cors = require("cors");
const app = express();
const {Server} = require("socket.io");
const http = require("http");




const server = http.createServer(app) ;



const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"]
  }
});


io.on('connection',(socket)=>{
    console.log("User Connected :",socket.id);
    socket.on('message',(data)=>{
        console.log("Message :",data);
        socket.broadcast.emit("message",data);
    });

    socket.on("typing",()=>{

        socket.broadcast.emit("typing",{user:socket.id})
    })
     
    socket.on("stopTyping",()=>{
        socket.broadcast.emit("stopTyping",{user:socket.id});
    })
    
socket.on("disconnect",()=>{
    console.log("User disconnect ho gya :",socket.id);
})
})


server.listen(5000,()=>{
    console.log("Server is connected..")
})




