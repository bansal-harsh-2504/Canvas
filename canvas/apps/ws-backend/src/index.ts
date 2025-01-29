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
const roomsMap = new Map<string, number>();

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded == "string" || !decoded.userId) {
      return null;
    }
    return decoded.userId;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      console.log("Token expired");
      return null;
    }
    console.log("Invalid token", err);
    return null;
  }
}

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) return ws.close();

  const queryParams = new URLSearchParams(
    url.includes("?") ? url.split("?")[1] : ""
  );
  const token = queryParams.get("token") || "";
  const userId = checkUser(token);
  if (!userId) {
    ws.close();
    return;
  }
  const user: User = { ws, rooms: new Set(), userId };
  users.set(ws, user);
  console.log("User %s connected", userId);

  ws.on("message", async function message(data) {
    try {
      const parsedData = JSON.parse(data as unknown as string);

      const { type, slug, message } = parsedData;

      if (!type || !["join_room", "leave_room", "chat"].includes(type)) {
        throw new Error("Invalid message type");
      }
      if (type === "join_room") {
        if (!slug)
          return ws.send(
            JSON.stringify({ error: "Slug is required to join the room" })
          );
        let roomId = roomsMap.get(slug);

        if (!roomId) {
          const room = await prismaClient.room.create({
            data: {
              adminId: userId,
              slug,
            },
          });
          roomId = room.id;
          rooms.set(slug, new Set());
        }
        user.rooms.add(slug);

        roomsMap.set(slug, roomId);

        rooms.get(slug)?.add(user);

        console.log(
          "User %s joined room (%s) with roomId %d",
          userId,
          slug,
          roomId
        );
      } else if (type === "leave_room") {
        if (!slug)
          return ws.send(
            JSON.stringify({ error: "Slug is required to leave the room" })
          );

        if (!roomsMap.get(slug)) {
          return ws.send(JSON.stringify({ error: "Invalid Slug" }));
        }

        if (![...user.rooms].includes(slug)) {
          return ws.send(
            JSON.stringify({ error: "You are not a member of this room" })
          );
        }

        user.rooms.forEach((roomSlug) => {
          if (roomSlug === slug) {
            user.rooms.delete(slug);
          }
        });

        const roomId = roomsMap.get(slug);

        rooms.get(slug)?.delete(user);

        console.log(
          "User %s left room (%s) with roomId %d",
          userId,
          slug,
          roomId
        );

        if (rooms.get(slug)?.size === 0) {
          try {
            await prismaClient.room.delete({ where: { slug } });
          } catch {
            console.log("Couldn't delete room from the database.");
          }
          rooms.delete(slug);
          roomsMap.delete(slug);
          console.log("Room (%s) has been removed because it is empty", slug);
        }
      } else if (type === "chat") {
        if (!slug || !message)
          return ws.send(
            JSON.stringify({ error: "Both slug and message are required" })
          );

        let roomId = roomsMap.get(slug);

        if (!roomId) {
          return ws.send(JSON.stringify({ error: "Invalid slug" }));
        }

        if (![...user.rooms].includes(slug)) {
          return ws.send(
            JSON.stringify({ error: "You are not a member of this room" })
          );
        }

        const room = rooms.get(slug);

        if (room) {
          try {
            await prismaClient.chat.create({
              data: {
                roomId,
                userId,
                message,
              },
            });
          } catch {
            console.log("Couldn't save message to database");
          }
          room.forEach((member) => {
            if (member.ws !== ws) {
              member.ws.send(JSON.stringify({ type: "chat", slug, message }));
            }
          });
        } else {
          return ws.send(JSON.stringify({ error: "Room not found" }));
        }
      }
    } catch (err) {
      ws.send(JSON.stringify({ error: "Invalid message format" }));
    }
  });

  ws.on("close", () => {
    console.log("User %s disconnected", userId);
    users.delete(ws);

    user.rooms.forEach((slug) => {
      rooms.get(slug)?.delete(user);

      if (rooms.get(slug)?.size === 0) {
        rooms.delete(slug);
        roomsMap.delete(slug);
        console.log("Room (%s) has been removed because it is empty", slug);
      }
    });
  });
});
