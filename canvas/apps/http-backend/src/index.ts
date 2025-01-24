import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";

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
    process.env.JWT_SECRET as string
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
