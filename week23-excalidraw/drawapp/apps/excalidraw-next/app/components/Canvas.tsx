"use client";
import { useRef, useEffect } from "react";
import initDraw from "../draw";

export default function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cleanup = initDraw(canvas, roomId, socket);
    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, [roomId, socket]);

  return (
    <div>
      <canvas ref={canvasRef} width={1440} height={840}></canvas>
    </div>
  );
}
