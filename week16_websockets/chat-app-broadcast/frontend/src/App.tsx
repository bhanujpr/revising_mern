import { useEffect, useState,useRef } from "react";
import "./App.css";

function App() {
  const [msgs, setMsgs] = useState(["hi there","hello"]);
  //@ts-ignore
  const wsRef=useRef();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event) => {
      console.log(event.data.type)
      setMsgs((m) => [...m, event.data]);
    };
    wsRef.current=ws;
    ws.onopen=()=>{
      ws.send(JSON.stringify({
        type:"join",
        payload:{
          roomId:"123"
        }
      }))
    }
    return ()=>{
ws.close()
    } 
  }, []);

  return (
    <div className="h-screen bg-black flex-col">
      <br />
      <div className="h-[90vh] bg-black-100">
        {msgs.map((msg) => (
          <div className="m-8">
            <span className="bg-white text-black rounded-2xl p-4 m-8">
              {msg}
            </span>
          </div>
        ))}
      </div>
      <div className="flex w-full bg-white p-4">
        <input type="text" id="message" className="flex-1 p-4" name="" />
        <button onClick={()=>{
          //@ts-ignore
          const message=document.getElementById("message")?.value;
          //@ts-ignore
          wsRef.current.send(JSON.stringify({
            type:"chat",
            payload:{
              message:message
            }
          }))
        }} className="bg-purple-600 text-white p-4">Send msg</button>
      </div>
    </div>
  );
}

export default App;
