const path=require("path")
const express=require('express')
const http=require('http')
const socketio=require('socket.io')

let app=express()
app.use(express.static(path.join(__dirname,"../public/")))
let server=http.Server(app)
let io=socketio(server)


let user=0
let totalmsg=0

io.on("connection",(socket)=>{
    console.log("user connected,total users:=",(user+1))
    socket.on("createEmail",(data)=>{
        totalmsg=+1
        console.log("new msg ",data)
        io.emit('newEmail',{
            from:data.from,
            to:data.to
        })
    })
    socket.emit("newEmail",{
        from:"rahul",
        to:"client"
    })
    socket.on("disconnect",()=>{
        user=-1
        console.log("user disconnected,total users",user)
    })
    

})

let port=process.env.PORT || 3000
server.listen(port,()=>{
    console.log("connected to server 3000");
})