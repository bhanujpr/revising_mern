import {WebSocketServer, WebSocket} from 'ws';

const wss = new WebSocketServer({port:8080});
interface user{
    socket:WebSocket;
    room: string;
}

let allSockets:user[]=[];

wss.on('connection',(socket)=>{



    socket.on("message",(msg)=>{
        //@ts-ignore
        const parsedMsg = JSON.parse(msg);

        if(parsedMsg.type ==="join"){
            allSockets.push({
                socket,
                room:parsedMsg.payload.roomId
            })
        }
        if(parsedMsg.type ==="chat"){
            const currUserRoom = allSockets.find((x)=>x.socket==socket);
            for(let i=0;i<allSockets.length;i++){
                if(allSockets[i]?.room == currUserRoom?.room){
                    console.log(parsedMsg.payload.message)
                    allSockets[i]?.socket.send(parsedMsg.payload.message);
                }
            }

        }
    })

    // socket.on("disconnect",()=>{
    //     allSockets=allSockets.filter(x=>x!=socket)
    //     console.log(socket + " left ")
    // })
    console.log(allSockets)
})