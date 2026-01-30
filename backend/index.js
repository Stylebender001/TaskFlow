import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import dbConnect from "./startup/db.js";
dbConnect();
import startupRoutes from "./startup/routes.js";
startupRoutes(app);
import logging from "./startup/logging.js";
logging();
import "express-async-errors";
import error from "./middleware/error.js";
app.use(error);
console.log("🔥 SERVER STARTED");

app.get("/test", (req, res) => {
  res.send("API is working");
});
app.use((req, res, next) => {
  console.log("➡️ REQUEST:", req.method, req.url);
  next();
});
app.get("/ping", (req, res) => {
  console.log("PING HIT");
  res.send("pong");
});
app.use((req, res, next) => {
  console.log("➡️ GOT REQUEST:", req.method, req.url);
  next();
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
