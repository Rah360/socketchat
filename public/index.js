var socket = io();
socket.on("connect",()=>{
    console.log("you are connected here")
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
socket.emit("joinRoom",{playerid},(data)=>{
    console.log(data)
})
socket.emit("getRoom",{playerid,room},(data)=>{
    console.log(data)
})

socket.emit("sendBroadcastMsg",{room,playerid})

//private message to member in a group
socket.emit("sendMsgMember",{room,playerid,friendid},(data)=>{
    console.log(data)
}) 

