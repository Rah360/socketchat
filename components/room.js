class room{
    constructor(id){
      this.id= id,
      this.players= [],
      this.started= false,
      this.count= 0
      this.active=1
      room.instances.push(this)
    }
    addPlayer(playerobj){
        this.players.push(playerobj)
        this.count=this.count+1    
    }
    isAllowed(){
      return  this.active==1 && this.started==false && this.count < 3
    }
    startRoom(){
      this.started=true
    }
    deactiveRoom(){
      this.active=0
    }
    checkPlayerExists(playerid){
      var index = this.players.findIndex(x => x.playerid==playerid)
      return index === -1 ? false : true
    }

    getPlayer(playerid){
      var playerobj = this.players.filter(x => x.playerid==playerid)
      return playerobj
    }

    removePlayers(){
      this.players=[]
    }
  }
  room.instances=[]

  room.prototype.destroy = function () {
  var i = 0;
  while (room.instances[i] !== this) { i++; }
  room.instances.splice(i, 1);
};
  module.exports=()=>room
