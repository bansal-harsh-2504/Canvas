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

const app = express();

app.post("/signup", (req, res) => {
  const data = createUserSchema.safeParse(req.body);

  if (!data.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }

  res.json({
    userID: 123,
  });
});

app.post("/signin", (req, res) => {
  const data = signInSchema.safeParse(req.body);

  if (!data.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }

  const userId = 1;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    token,
  });
});

app.post("/room", middleware, (req, res) => {
  const data = createRoomSchema.safeParse(req.body);

  if (!data.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }

  res.json({
    roomID: 123,
  });
});

app.get("/", (req, res) => {
  res.send("API Working!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
