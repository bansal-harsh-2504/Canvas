import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware/auth.middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import {
  createUserSchema,
  signInSchema,
  createRoomSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import bcrypt from "bcrypt";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));

app.post("/signup", async (req, res) => {
  const data = createUserSchema.safeParse(req.body);

  if (!data.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }

  const { email, password, name } = data.data;

  try {
    const existingUser = await prismaClient.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .status(201)
      .json({
        message: "User created successfully",
        token,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.post("/login", async (req, res) => {
  const data = signInSchema.safeParse(req.body);

  if (!data.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }

  const { email, password } = data.data;

  const user = await prismaClient.user.findFirst({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({
      message: "Invalid credentials!",
    });
    return;
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res
    .cookie("token", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    })
    .status(201)
    .json({
      message: "Successfully signed in",
      token,
    });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Logged out successfully" });
});

app.post("/room", middleware, async (req, res) => {
  const data = createRoomSchema.safeParse(req.body);

  if (!data.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }

  const userId = req.userId;
  const { name } = data.data;
  try {
    const newRoom = await prismaClient.room.create({
      data: {
        slug: name,
        adminId: userId as string,
      },
    });

    res.json({
      roomId: newRoom.id,
    });
  } catch (e) {
    res.status(411).json({
      message: "Room already exists with this name",
    });
  }
});

app.get("/chats/:slug", middleware, async (req, res) => {
  const slug = req.params.slug;

  const room = await prismaClient.room.findFirst({
    where: {
      slug,
    },
  });

  if (!room) {
    res.json({
      messages: [],
      message: "No messages in room",
    });
    return;
  }

  const roomId = room.id;

  const messages = await prismaClient.chat.findMany({
    where: {
      roomId,
    },
    orderBy: {
      id: "desc",
    },
    take: 50,
  });

  res.json({
    messages,
    message: "Upto last 50 messages fetched",
  });
});

app.get("/verify", middleware, (req, res) => {
  res.json({ message: "You have access!", userId: req.userId });
});

app.get("/", (req, res) => {
  res.send("API Working!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
