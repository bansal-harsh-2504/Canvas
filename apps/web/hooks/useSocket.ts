import { useEffect, useState } from "react";
import useAuthStore from "../store/useStore";

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [errMessage, setErrMessage] = useState("");
  const { user } = useAuthStore();

  useEffect(() => {
    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}?token=${user?.token}`
    );
    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    };
    ws.onerror = (error) => {
      setErrMessage("WebSocket connection failed.");
      setLoading(false);
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
  }, []);

  return {
    socket,
    loading,
    errMessage,
  };
}
