import { trackInfo } from "./trackInfo";

export interface PlayerInterface {
  defaultTrackInfo: trackInfo;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentTrackInfo: trackInfo;
  setCurrentTrackInfo: (trackInfo: trackInfo) => void;
  isTrackChanged: boolean;
  setIsTrackChanged: (isTrackChanged: boolean) => void;
}
