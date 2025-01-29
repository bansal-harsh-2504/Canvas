"use client";

import { useEffect, useState, useRef } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
  messages,
  slug,
}: {
  messages: { message: string }[];
  slug: string;
}): JSX.Element {
  const [chats, setChats] = useState(messages);
  const { socket, loading } = useSocket();
  const messageRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          slug,
        })
      );

      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === "chat") {
          setChats((chats) => [...chats, parsedData.message]);
        }
      };
    }

    return () => {
      if (socket) {
        socket.onmessage = null;
      }
    };
  }, [socket, loading, slug]);

  const handleSendMessage = () => {
    console.log(loading);
    if (messageRef.current && socket && !loading) {
      const message = messageRef.current.value;
      socket.send(
        JSON.stringify({
          type: "chat",
          message,
          slug,
        })
      );
      setChats((chats) => [...chats, { message }]);
      messageRef.current.value = "";
    }
  };

  return (
    <div>
      <div>
        {chats.map((m, index) => (
          <div key={index}>{m.message}</div>
        ))}
      </div>

      <input
        type="text"
        ref={messageRef}
        className="p-2 border rounded"
        placeholder="Type a message"
      />
      <button
        onClick={() => handleSendMessage()}
        className="bg-blue-500 text-white p-2 rounded hover:cursor-pointer"
      >
        Send Message
      </button>
    </div>
  );
}
