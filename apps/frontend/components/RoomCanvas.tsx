"use client";
import { useEffect } from "react";
import { Canvas } from "./Canvas";
import { useSocket } from "@/hooks/useSocket";

export function RoomCanvas({ slug }: { slug: string }) {
  const { socket, loading } = useSocket();

  useEffect(() => {
    if (loading || !socket) return;

    if (socket.readyState === WebSocket.OPEN) {
      const data = JSON.stringify({
        type: "join_room",
        slug,
      });
      socket.send(data);
    } else {
      const onOpenHandler = () => {
        const data = JSON.stringify({
          type: "join_room",
          slug,
        });
        socket.send(data);
      };

      socket.addEventListener("open", onOpenHandler);

      return () => {
        socket.removeEventListener("open", onOpenHandler);
      };
    }
  }, [slug, loading, socket]);

  if (loading || !socket) {
    return <div>Connecting to ws server....</div>;
  }

  return (
    <div>
      <Canvas slug={slug} socket={socket} />
    </div>
  );
}
