import packageJSON from "../../../../package.json";
import express, { Application } from "express";
import cors from "cors";
import { ROOT_URL_V1 } from "@/constants";
import { Request, Response } from "express";

import "dotenv/config";
import fs from "fs";
import path from "path";
import http, { IncomingMessage, ServerResponse } from "http";
import openRadio from "openradio";
import { Server as SocketIO } from "socket.io";
import {
  downloadFileFromGoogleDrive,
  getGistFileContent,
  getTrackDuration,
  exitHandler,
} from "@/server/utils/tracks";
import { GistTrackList, TrackInfo } from "@/typings/trackInfo";

// configs
const radio = openRadio();
const app: Application = express();

const playlistFile = (process.env.RADIO_PLAYLIST_FILE as string) || "sylfm.tracks";
const socketPort =
  parseInt(process.env.VITE_SOCKET_PORT as string) || parseInt(process.env.PORT as string) || 3001;
const trackPath = path.join(__dirname, "../..", "vite/dist/tracks", "radio.mp3");

app.use(express.json({ limit: "20mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//sockets
const socketServer = http.createServer(app);
const io = new SocketIO(socketServer, {
  cors: {
    origin: [`http://localhost:${process.env.VITE_BACKEND_PORT}`],
  },
  transports: ["websocket"],
});

let trackInfo: TrackInfo = {
  title: "",
  image: "",
  duration: 0,
  started_at: 0,
  difference_in_seconds: 0,
  time: "",
};

let listenersCount = 0;
const manualDelayTrackChangedEventSeconds = 0;

app.use(express.static("./.local/vite/dist"));

app.get(`${ROOT_URL_V1}/version`, (req: Request, res: Response) => {
  const respObj: RespExampleType = {
    id: 1,
    version: packageJSON.version,
    envVal: process.env.ENV_VALUE as string,
  };
  res.send(respObj);
});

app.get(
  `${ROOT_URL_V1}/track-info`,
  (req: Request, res: Response<TrackInfo>): Response<TrackInfo> => {
    const difference_in_seconds = Math.floor(Date.now() / 1000) - trackInfo.started_at;
    return res.status(200).json({
      ...trackInfo,
      difference_in_seconds,
    });
  }
);

app.get(`${ROOT_URL_V1}/stream`, (req: Request, res: Response) => {
  res.setHeader("Content-Type", "audio/mp3");
  radio.pipe(res);
});

// generic 404 handler
app.use(`${ROOT_URL_V1}/*`, (req: Request, res: Response): Response<{ message: string }> => {
  return res.status(404).json({ message: "API endpoint not found" });
});

// server creation
http.createServer((req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  res.setHeader("Content-Type", "audio/mp3");
  radio.pipe(res);
});

socketServer.listen(socketPort, () => {
  console.log(`Socket server listening on port ${socketPort}`);
});

io.on("connection", (socket) => {
  // handle listeners count and socket for listeners
  listenersCount++;
  io.emit("listeners_count", listenersCount);
  socket.on("disconnect", () => {
    listenersCount--;
    io.emit("listeners_count", listenersCount);
  });

  // handle track change
  if (trackInfo.duration > 0) {
    setTimeout(() => {
      socket.emit("track_changed", trackInfo);
    }, manualDelayTrackChangedEventSeconds * 1000);
  }
});

const playTrack = async () => {
  try {
    // check if old track exists and remove it
    if (fs.existsSync(trackPath)) {
      fs.unlinkSync(trackPath);
    }

    // get playlist from gist
    const data = await getGistFileContent(
      process.env.RADIO_GIST_ID as string,
      `${playlistFile}.json`
    );

    if (!data) {
      exitHandler("Error while fetching playlist file content");
    }

    const playlist: GistTrackList = JSON.parse(data);

    // download random track from playlist
    const randomPlaylistNumber: number = Math.floor(Math.random() * playlist.length);
    const randomTrack = playlist[randomPlaylistNumber];

    await downloadFileFromGoogleDrive(randomTrack.file, trackPath);
    const duration = await getTrackDuration(trackPath);
    if (duration === 0) {
      console.log("Track duration is 0, skipping track");
      playTrack();
      return;
    }
    radio.play(fs.createReadStream(trackPath));

    trackInfo = {
      ...trackInfo,
      title: randomTrack.title,
      image: randomTrack.image,
      duration,
      started_at: Math.floor(Date.now() / 1000),
    };

    setTimeout(() => {
      console.log(`\nPlaying track: ${trackInfo.title}`);
      io.sockets.emit("track_changed", trackInfo);
    }, manualDelayTrackChangedEventSeconds * 1000);
  } catch (error) {
    console.error(error);
  }
};

// play track on start
playTrack();

// play track when current track ends
radio.on("finish", () => {
  playTrack();
});

export default app;
