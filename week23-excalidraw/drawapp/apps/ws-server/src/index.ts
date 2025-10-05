import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db-common/client";

const  wss = new WebSocketServer({port:8080})


interface user{
    ws:WebSocket,
    rooms:string[],
    userId:string
}

const users:user[]=[];


wss.on('connection',function(ws,request){

    const url = request.url;
    if(!url){
        return
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token')||""
    
    const decoded = jwt.verify(token,JWT_SECRET);
    
    if(!decoded){
        ws.close();
        return;
    }
    //verify decoded is it exist in db
    users.push({
        decoded,
        rooms:[],
        //@ts-ignore
        ws
    })

    ws.on('message',async function message(data){
        const parsedData= JSON.parse(data as unknown as string);
        const response = await prismaClient.room.findUnique({
            where:{
                slug:parsedData.roomId
            }
        })
        console.log(response , decoded)
        const id = response?.id
        if(parsedData.type === "join_room"){
            //@ts-ignore
            const user = users.find(x=> x.ws===ws);
            user?.rooms.push(parsedData.roomId);
        }

        if(parsedData.type === "leave_room"){
            //@ts-ignore
            const user = users.find(x=> x.ws===ws);
            if(!user){
                return
            }
            user.rooms = user?.rooms.filter(x=>x===parsedData.room);
        }


        if(parsedData.type==="chat"){
            const slug = parsedData.roomId;
            const message = parsedData.message;

            const dataInserted = await prismaClient.chat.create({
                //@ts-ignore
                data:{
                    roomId:id,
                    mesage:message,
                    userId:decoded.toString()
                }
            })

            users.forEach(u=>{
                if(u.rooms.includes(slug)){
                    u.ws.send(JSON.stringify({
                        type:"chat",
                        message:message,
                        slug
                    }))
                }
            })
        }


        
    });
});