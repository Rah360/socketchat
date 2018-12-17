const socketio=require('socket.io')

let components=require('../components/index')()

let {world,room,player}=components

let findEmtyRoom=()=>{
    let emtyRoomlist=world.listActive()
    if(emtyRoomlist.length>0){
        return emtyRoomlist[0]
    }else{
        let emtyroom=new room(Math.floor(Math.random()*1000))
        world.add(emtyroom)
        return emtyroom
    }
}

module.exports=(server)=>{
    let io=socketio(server)

    io.on("connection",(socket)=>{
       console.log("connected")

        //join room ,pass {}
        socket.on('joinRoom',(data,callback)=>{
            let roomobj=findEmtyRoom()
            if(!roomobj.checkPlayerExists(data.playerid)){
                let newplayer=new player(data.playerid,roomobj.id,socket.id)
                roomobj.addPlayer(newplayer)
            }
            socket.join(roomobj.id)
            console.log("total player instances ",player.instances.length)
            console.log("total room instances ",room.instances.length)
            callback(roomobj.id)
            io.to(roomobj.id).emit("getPlayers",world.getPlayers(roomobj.id)) //send player list to everone who joined
        })
        
        //get room which user joined by room id and socket id
        socket.on('getRoom',(data,callback)=>{
                let getRoomObj=world.getRoomByPlayeridRoomid(data.roomid,data.playerid)
                if(getRoomObj){
                    callback(JSON.stringify(getRoomObj))
                }else{
                    callback("no room that has you in it,you are loner")
                }
        })

        //broadcast message in room
        socket.on('sendBroadcastMsg',(data,callback)=>{
            let roomid=world.getRoomIdByMember(data.room,data.playerid)
            socket.to(roomid).broadcast.emit("getMsgFromRoom",(data.msg))
            // callback(roomid)
        })
        socket.on('sendMsgMember',(data,callback)=>{
            let frndsocketid=world.getRoomMateSocketId(data.room,data.playerid,data.friendid)
            if(typeof frndsocketid === "string"){
                socket.to(frndsocketid).emit("getMsgFromRoom",(data.msg))
                callback("message sent")
            }else{
                callback("error")
            }
            // callback(roomid)
        })

        socket.on("disconnect",()=>{
            if(socket.id){
                console.log("user disconnected,total users")
                world.removePlayerFromRoom(socket.id)
                console.log(player.instances.length)
                console.log(room.instances.length)

            }
        })

    })

    return io
}