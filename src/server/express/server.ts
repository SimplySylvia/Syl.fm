import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import apiV1 from "./V1";

const server = createServer();

server.on("request", apiV1);

server.listen(process.env.VITE_BACKEND_PORT, () => {
  console.log(`API v1 (re)started`);
});
