"use client";
import { useEffect, useState, useRef } from "react";
import { useSocket } from "../hooks/useSocket";
import axios from "axios";
import useAuthStore from "../store/useStore";

export function ChatRoomClient({ slug }: { slug: string }) {
  const [chats, setChats] = useState<{ message: string }[]>([]);
  const { socket, loading } = useSocket();
  const messageRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user) return;
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/chats/${slug}`,
          {
            headers: { authorization: `Bearer ${user.token}` },
          }
        );
        setChats(res.data?.messages?.reverse() || []);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };

    fetchMessages();
  }, [slug, user]);

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
          setChats((prevChats) => [...prevChats, parsedData.message]);
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
    if (messageRef.current && socket && !loading) {
      const message = messageRef.current.value;
      socket.send(
        JSON.stringify({
          type: "chat",
          message,
          slug,
        })
      );
      setChats((prevChats) => [...prevChats, { message }]);
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
        onClick={handleSendMessage}
        className="bg-blue-500 text-white p-2 rounded hover:cursor-pointer"
      >
        Send Message
      </button>
    </div>
  );
}
