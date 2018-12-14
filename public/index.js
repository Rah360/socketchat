var socket = io();
socket.on("connect",()=>{
    console.log("you are connected")
})
socket.on('disconnect',()=>{
    console.log("disconnected")
})

socket.on("fromRoom",(data)=>{
    console.log(socket.room)
    console.log(data)
})
socket.on("throwRoomObj",(data)=>{
    console.log(data)
})
socket.on("errors",(data)=>{
    console.error(data)
})
socket.on("getPlayers",(data)=>{
    console.log(data)
})
socket.on("getMsgFromRoom",(data)=>{
    console.log(data)
})