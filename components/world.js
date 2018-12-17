function world() {
  this.rooms = []
}
world.prototype.add = function(item) {
  this.rooms.push(item)
}
//get aall rooms
world.prototype.listAll = function(item) {
  return this.rooms
}
//get active rooms
world.prototype.listActive = function(item) {
  return this.rooms.filter(x => {
      if (x.players.length < 4 && x.active == 1 && x.started == false) {
          return x
      }
  })
}
//gets room by  roomid
world.prototype.getSingalRoom = function(item) {
  return this.rooms.find(x => x.id == item)
}

//get players in room only
world.prototype.getPlayers = function(item) {
  let currentObj = this.getSingalRoom(item)
  if (currentObj) {
      return currentObj.players
  } else {
      return null
  }
}

world.prototype.getRoomByOnlySocketid = function(socketid) {
  return this.rooms.find(x => {
      if (x.players.filter(y => y.socketid == socketid).length > 0) { //find room id and then check its players array to find player's playerid
          return x
      }
  })
}

world.prototype.getRoomByOnlyPlayerid = function(playerid) {
  return this.rooms.find(x => {
      if (x.players.filter(y => y.playerid == playerid).length > 0) { //find room id and then check its players array to find player's playerid
          return x
      }
  })
}


//gets room by room id and playerid
world.prototype.getRoomByPlayeridRoomid = function(roomdid, playerid) {
  return this.rooms.find(x => {
      if (x.id == roomdid && x.players.filter(y => y.playerid == playerid).length > 0) { //find room id and then check its players array to find player's socketid
          return x
      }
  })
}

//gets room id by checking if the current player exists or not
world.prototype.getRoomIdByMember = function(roomdid, playerid) {
  let players = this.getPlayers(roomdid)
  let flag=players.find((x) =>{ 
    if(playerid===x.playerid) {
         return true;
    } else {
        return false
    }
})


  return flag ? roomdid : null
}

world.prototype.getRoomMateSocketId = function(roomdid, playerid,friendid) {
  let players = this.getPlayers(roomdid)
  console.log(players)
  let tocheck=[playerid,friendid]
  let flag=false
  if(players ){
    let count=0

    players.forEach(x=>{
      if(tocheck.includes(x.playerid)){
        count=count+1
           }
    })
    if(count === tocheck.length){
    let frndsocket=players.find(x=>x.playerid==friendid).socketid
      return frndsocket
    }else{
      return null
    }
  }else
  {
    return null
  }
}


//playerid is yet to change from here

//remove player by socketid
world.prototype.removePlayerFromRoom = function(socketid) {
  let roomobj=this.getRoomByOnlySocketid(socketid)
  if(roomobj){
    let players=roomobj.players
    // let playerobj=players.filter(x=>x.socketid==socketid)
    // playerobj.destroy()
    let i=0
    while (players[i].socketid !==socketid ) { i++; }
    let playerobj=roomobj.players[i]
    playerobj.updateRoom(null)
    roomobj.players.splice(i, 1);
    console.log("room,,,,,,,",roomobj)
  }else{
    console.log("nothing to deteee");
  }
}

//removes entire room by roomid
world.prototype.removeRoomBySocketId = function(socketid) {
  let roomobj=this.getRoomBySocketID(socketid)
  if(roomobj){
    delete roomobj
  }else{
    console.log("nothing to deteee");
  }
}

//removes entire room by socketid
world.prototype.removeRoomBySocketId = function(socketid) {
  let roomobj=this.getRoomBySocketID(socketid)
  if(roomobj){
    let players=roomobj.players
    players.forEach(x=>{
      x.destroy()
      delete x
    })
    delete roomobj
  }else{
    console.log("nothing to deteee");
  }
}

module.exports = () => world