export type trackInfo = {
  title: string;
  image: string;
  duration: number;
  time: string;
  difference_in_seconds: number;
};

export interface InfoInterface {
  setCurrentTrackInfo: (trackInfo: trackInfo) => void;
  setIsTrackChanged: (isTrackChanged: boolean) => void;
}
