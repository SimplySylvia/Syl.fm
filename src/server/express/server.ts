import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import app from "./restApi";
import { commonExample } from "@/utils/utils";

commonExample();

const server = createServer();

server.on("request", app);

server.listen(5000, () => {
  console.log(`API v1 (re)started`);
});
