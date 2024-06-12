import { useState, useEffect } from "react";

import SocketConnection from "@/services/socket";
import { TrackInfo } from "@/typings/trackInfo";

interface SocketTrackReturn {
  trackInfo: TrackInfo;
}

const useTrackInfo = (socket_listener: string): SocketTrackReturn => {
  const [trackInfo, setTrackInfo] = useState<TrackInfo>({
    title: "",
    duration: 0,
    image: "",
    difference_in_seconds: 0,
    started_at: 0,
    time: "",
  });

  useEffect(() => {
    SocketConnection.on(socket_listener, (track: TrackInfo) => {
      setTrackInfo(track);
    });
  }, [socket_listener]);

  return { trackInfo };
};

export default useTrackInfo;
