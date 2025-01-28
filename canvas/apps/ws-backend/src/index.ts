import "dotenv/config";
import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });
interface User {
  ws: WebSocket;
  rooms: Set<string>;
  userId: string;
}
const users = new Map<WebSocket, User>();
const rooms = new Map<string, Set<User>>();

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded == "string" || !decoded.userId) {
      return null;
    }
    return decoded.userId;
  } catch {
    return null;
  }
}

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) return ws.close();

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";
  const userId = checkUser(token);
  if (!userId) {
    ws.close();
    return;
  }
  const user: User = { ws, rooms: new Set(), userId };
  users.set(ws, user);
  console.log("user %s connected", userId);

  ws.on("message", async function message(data) {
    try {
      const parsedData = JSON.parse(data as unknown as string);

      const { type, roomId, message } = parsedData;

      if (!type || !["join_room", "leave_room", "chat"].includes(type)) {
        throw new Error("Invalid message type");
      }

      if (type === "join_room") {
        if (!roomId) return;
        user.rooms.add(roomId);
        if (!rooms.has(roomId)) rooms.set(roomId, new Set());
        rooms.get(roomId)?.add(user);
      } else if (type === "leave_room") {
        if (!roomId) return;
        user.rooms.delete(roomId);
        rooms.get(roomId)?.delete(user);
        if (rooms.get(roomId)?.size === 0) rooms.delete(roomId);
      } else if (type === "chat") {
        if (!roomId || !message) return;
        try {
          await prismaClient.chat.create({
            data: { roomId, userId, message },
          });
        } catch (err) {
          console.error("Database error:", err);
          ws.send(JSON.stringify({ error: "Message could not be saved." }));
        }
        rooms.get(roomId)?.forEach((member) => {
          if (member.ws !== ws) {
            member.ws.send(JSON.stringify({ type: "chat", roomId, message }));
          }
        });
      }
    } catch (err) {
      ws.send(JSON.stringify({ error: "Invalid message format" }));
    }
  });

  ws.on("close", () => {
    console.log("user %s disconnected", userId);
    users.delete(ws);
    user.rooms.forEach((roomId) => {
      rooms.get(roomId)?.delete(user);
      if (rooms.get(roomId)?.size === 0) rooms.delete(roomId);
    });
  });
});
