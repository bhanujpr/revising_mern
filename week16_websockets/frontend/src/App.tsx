// import { WebSocket } from 'ws'
import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [socket,setSocket]=useState();
  const inputRef =useRef();

  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8000")
    setSocket(ws)


    ws.onmessage=(ev)=>{
      alert(ev.data)
    }
  },[])


  function sendMsg(){
    if(!socket){
      return;
    }
    //@ts-ignore
    socket.send(inputRef.current.value)
  }

  return (
    <>
    <div>
      <input type="text" ref={inputRef}/>
      <button onClick={sendMsg}>Send</button>
    </div>
    </>
  )
}

export default App
