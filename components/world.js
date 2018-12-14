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
      if (x.players.length < 2 && x.active == 1 && x.started == false) {
          return x
      }
  })
}
//gets room by  roomid
world.prototype.getSingalRoom = function(item) {
  return this.rooms.find(x => x.id == item)
}


// //get room by socketid
// world.prototype.getRoomBySocketID = function(socketid) {
//   return this.rooms.find(x => {
//       if (x.players.filter(y => y.socketid == socketid).length > 0) { //find room id and then check its players array to find player's socketid
//           return x
//       }
//   })
// }
//get room by playerid
world.prototype.getRoomBySocketID = function(playerid) {
  return this.rooms.find(x => {
      if (x.players.filter(y => y.playerid == playerid).length > 0) { //find room id and then check its players array to find player's socketid
          return x
      }
  })
}

// //gets room by room id and socketid
// world.prototype.getRoomByClient = function(roomdid, socketid) {
//   return this.rooms.find(x => {
//       if (x.id == roomdid && x.players.filter(y => y.socketid == socketid).length > 0) { //find room id and then check its players array to find player's socketid
//           return x
//       }
//   })
// }
//gets room by room id and playerid
world.prototype.getRoomByPlayerid = function(roomdid, playerid) {
  return this.rooms.find(x => {
      if (x.id == roomdid && x.players.filter(y => y.playerid == playerid).length > 0) { //find room id and then check its players array to find player's socketid
          return x
      }
  })
}
//get room by roomid ,user and friend's socket id
// world.prototype.getRoomByMembers = function(roomdid, usersocketid, friendsocketid) {
//   let flag
//   let players = this.getPlayers(roomdid)
//   let toCheck =friendsocketid  ? [usersocketid, friendsocketid ] : [usersocketid]
//   players.forEach((x, i) => {
//       if (toCheck.includes(x.socketid)) {
//           flag = true
//       } else {
//           flag = false
//       }

//   })
//   return flag ? roomdid : null
// }
world.prototype.getRoomByMember = function(roomdid, playerid) {
  
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


//get players in room only
world.prototype.getPlayers = function(item) {
  let currentObj = this.getSingalRoom(item)
  if (currentObj) {
      return currentObj.players
  } else {
      return null
  }
}
//playerid is yet to change from here

//remove player by socketid
world.prototype.removePlayerFromRoom = function(socketid) {
  let roomobj=this.getRoomBySocketID(socketid)
  if(roomobj){
    console.log("here",roomobj.players)
    let players=roomobj.players
    // let playerobj=players.filter(x=>x.socketid==socketid)
    // playerobj.destroy()
    let i=0
    while (players[i].socketid !==socketid ) { i++; }
    let playerobj=roomobj.players[i]
    console.log(playerobj)
    playerobj.updateRoom(null)
    roomobj.players.splice(i, 1);
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