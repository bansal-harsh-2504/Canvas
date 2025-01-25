import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware/auth.middleware";
import { JWT_SECRET } from "@repo/backend-common/config";

const app = express();

app.post("/signup", (req, res) => {
  res.json({
    userID: 123,
  });
});

app.post("/signin", (req, res) => {
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
