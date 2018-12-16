const World=require('../components/world')()
const room=require('../components/room')()
const player=require('../components/player')()

let world=new World()


module.exports=()=>({world,room,player})