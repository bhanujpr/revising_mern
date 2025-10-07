// ✅ draw.ts
import axios from "axios";
import { HTTP_BACKEND } from "../config";

export default async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let existingShapes: any[] = [];

  const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    existingShapes.forEach((shape) => {
      if (shape.type === "rect") {
        ctx.strokeStyle = "white";
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      }
    });
  };

  // ✅ fetch shapes without making initDraw async
  // const ans = await getExistingShapes(roomId);
  // console.log(ans.data?.data)
  getExistingShapes(roomId).then((shapes) => {
    console.log("shapes",shapes)
    existingShapes = shapes;
    clearCanvas();
    console.log(existingShapes)
  });

  const handleMessage = (event: MessageEvent) => {
    const message = JSON.parse(event.data);
    if (message.type === "chat") {
      const shape =
        typeof message.message === "string"
          ? JSON.parse(message.message)
          : message.message;
      existingShapes.push(shape);
      clearCanvas();
    }
  };

  socket.addEventListener("message", handleMessage);

  let clicked = false;
  let startX = 0;
  let startY = 0;

  const handleMouseDown = (e: MouseEvent) => {
    clicked = true;
    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!clicked) return;
    clicked = false;
    const rect = canvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;
    const shape = {
      type: "rect",
      x: startX,
      y: startY,
      width: endX - startX,
      height: endY - startY,
    };
    existingShapes.push(shape);
    clearCanvas();
    socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify(shape),
        roomId,
      })
    );
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!clicked) return;
    const rect = canvas.getBoundingClientRect();
    const width = e.clientX - rect.left - startX;
    const height = e.clientY - rect.top - startY;
    clearCanvas();
    ctx.strokeStyle = "white";
    ctx.strokeRect(startX, startY, width, height);
  };

  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", handleMouseMove);

  // ✅ return cleanup function directly
  return () => {
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mouseup", handleMouseUp);
    canvas.removeEventListener("mousemove", handleMouseMove);
    socket.removeEventListener("message", handleMessage);
  };
}

async function getExistingShapes(roomId: string) {
  const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
  // console.log(res)
  const messages = res.data.messages;
  // console.log(messages)
  
  const shapes = messages.map((x: {message: string}) => {
          const messageData = JSON.parse(x.message)
          return messageData;
      })
      if(shapes)return shapes;
      return [];
}
