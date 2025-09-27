import {WebSocketServer} from 'ws';
const wss= new WebSocketServer({port:8000});


wss.on("connection",function(socket){
    // setInterval(()=>{
    //     // socket.send("Hello")
    // },500)
    socket.on("message",(e)=>{
        socket.send(e.toString())
    })
})