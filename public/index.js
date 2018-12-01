var socket = io();
socket.on("connect",()=>{
    console.log("you are connected")
})
socket.on('disconnect',()=>{
    console.log("disconnected")
})
socket.on('newEmail',(data)=>{
    console.log(data);
    
})
socket.emit("createEmail",{
    to:"rahul",
    from:"client"
})