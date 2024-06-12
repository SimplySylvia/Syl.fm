export type TrackInfo = {
  title: string;
  image: string;
  duration: number;
  time: string;
  difference_in_seconds: number;
  started_at: number;
};

export type GistTrackList = {
  title: string;
  file: string;
  image: string;
  source_url: string;
}[];

export interface InfoInterface {
  setCurrentTrackInfo: (trackInfo: TrackInfo) => void;
  setIsTrackChanged: (isTrackChanged: boolean) => void;
}
