import { TrackInfo } from "./trackInfo";

export interface PlayerInterface {
  defaultTrackInfo: TrackInfo;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentTrackInfo: TrackInfo;
  setCurrentTrackInfo: (trackInfo: TrackInfo) => void;
  isTrackChanged: boolean;
  setIsTrackChanged: (isTrackChanged: boolean) => void;
}
