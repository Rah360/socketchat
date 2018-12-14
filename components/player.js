
class player{
    constructor(playerid,room,socketid){
      this.playerid=playerid
      this.currentroom=room
      this.socketid=socketid
      this.isConnectedToRoom=false
      this.joinTime=new Date().getTime()
      player.instances.push(this)
    }
    getDetails(){
      return {
        playerid:this.playerid,
        "current room":this.currentroom,
        "socket id":this.socketid,
        "join time":this.joinTime
      }
    }
    updateRoom(newroom){
      this.currentroom=newroom
    }
  }

player.instances=[]

player.prototype.destroy = function () {
  var i = 0;
  while (player.instances[i] !== this) { i++; }
  player.instances.splice(i, 1);
};

module.exports=()=>player