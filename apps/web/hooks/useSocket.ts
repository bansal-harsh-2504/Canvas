"use client";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/useStore";

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) return;

    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}?token=${user?.token}`
    );

    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    };

    ws.onclose = () => {
      setLoading(true);
      setSocket(null);
    };

    return () => {
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close();
      }
    };
  }, [isAuthenticated]);

  return { socket, loading };
}
