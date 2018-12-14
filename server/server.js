const path=require("path")
const express=require('express')
const http=require('http')
const socketio=require('socket.io')
const World=require('../components/world')()
const room=require('../components/room')()
const player=require('../components/player')()

let world=new World()



let app=express()
app.use(express.static(path.join(__dirname,"../public/")))
let server=http.Server(app)
let io=require('../socketServer/socketServer')(server)

// let io=socketio(server)

// let findEmtyRoom=()=>{
//     let emtyRoomlist=world.listActive()
//     if(emtyRoomlist.length>0){
//         return emtyRoomlist[0]
//     }else{
//         let emtyroom=new room(Math.floor(Math.random()*1000))
//         world.add(emtyroom)
//         return emtyroom
//     }
// }

// io.on("connection",(socket)=>{
//    console.log("connected")
//     socket.on("disconnect",()=>{
//         console.log("user disconnected,total users")
//     })
//     //join room ,pass {}
//     socket.on('joinRoom',(data,callback)=>{
//         let roomobj=findEmtyRoom()
//         let newplayer=new player(Math.floor(Math.random()*1000),roomobj.id,socket.id)
//         roomobj.addPlayer(newplayer)
//         socket.join(roomobj.id)
//         callback(roomobj.id)
//         io.to(roomobj.id).emit("getPlayers",world.getPlayers(roomobj.id)) //send player list to everone who joined
//     })
//     //get room which user joined by room id and socket id
//     socket.on('getRoom',(data,callback)=>{
//             let getRoomObj=world.get(data.id,socket.id)
//             callback(getRoomObj)
//     })
//     socket.on('toRoom',(data)=>{
//         socket.broadcast.to(data.room).emit("fromRoom",{to:data.to,from:data.from})
//     })
// })

let port=process.env.PORT || 3000
server.listen(port,()=>{
    console.log("connected to server 3000");
})