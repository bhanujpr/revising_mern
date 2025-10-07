"use client"
import { useEffect,useRef, useState } from "react";
import initDraw from "../draw";
import { WS_URL } from "../config";
import Canvas from "./Canvas";

export function CanvasComponent({roomId}:{roomId:string}){
const [socket, setSocket]= useState<WebSocket | null>(null)

  useEffect(()=>{
    const token = localStorage.getItem("token")
    const ws = new WebSocket(`${WS_URL}?token=${token}`)

    ws.onopen=()=>{
        setSocket(ws);
        ws.send(JSON.stringify({
          type:"join_room",
          roomId
        }))
    }
  },[])

 

  if(!socket){
    return <div>
        Connexting to server...
    </div>
  }

  return(<div >
    <Canvas roomId={roomId} socket={socket}/>
    
  </div>
  )
}