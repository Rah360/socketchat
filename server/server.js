const path=require("path")
const express=require('express')
const http=require('http')
const socketio=require('socket.io')

let app=express()
app.use(express.static(path.join(__dirname,"../public")))
let server=http.Server(app)
let io=socketio(server)
io.on("connection",(socket)=>{
    console.log("new connection");
    socket.on("disconnect",()=>{
        console.log("closed")
    })
    socket.emit("newEmail",{
        from:"me",
        to:"rahul"
    })
    socket.on("createEmail",(data)=>{
        console.log(data)
    })
})

let port=process.env.PORT || 3000
server.listen(port,()=>{
    console.log("connected to server")
})