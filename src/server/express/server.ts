import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import apiV1 from "./V1";

const PORT = process.env.VITE_BACKEND_PORT || process.env.PORT;

const server = createServer();

server.on("request", apiV1);

server.listen(PORT, () => {
  console.log(`API v1 (re)started`);
});
