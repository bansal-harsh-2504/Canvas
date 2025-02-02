"use client";
import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";

export function Canvas({ slug, socket }: { socket: WebSocket; slug: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const initRef = useRef(false);

  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (canvasRef.current && !initRef.current) {
      initRef.current = true;
      initDraw(canvasRef.current, slug, socket);
    }
  }, [slug, socket]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
      ></canvas>
    </div>
  );
}
