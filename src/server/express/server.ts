import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import app from "./restApi";

const server = createServer();

server.on("request", app);

server.listen(process.env.VITE_BACKEND_PORT, () => {
  console.log(`API v1 (re)started`);
});
