import { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";
import useListenerCount from "@/hooks/useListenerCount";
import useTrackInfo from "@/hooks/useTrackInfo";
import { ROOT_URL_V1 } from "@/constants";

import { NotPlaying, Playing } from "@/components/Icons";

const HomePage = (): JSX.Element => {
  const { listenerCount } = useListenerCount("listeners_count");
  const { trackInfo } = useTrackInfo("track_changed");
  const [tunedIn, setTunedIn] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext>(null);

  useEffect(() => {
    if (trackInfo) {
      audioContextRef.current = new AudioContext();
    }
  }, [trackInfo]);

  useEffect(() => {}, [audioElement]);

  const handlePlayToggle = async () => {
    await audioContextRef.current?.resume();
    if (audioElement) {
      if (tunedIn) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  };

  useEffect(() => {
    handlePlayToggle()
      .then((r) => r)
      .catch((e) => console.error(e));
  }, [tunedIn]);

  return (
    <div className={styles.app}>
      <img width="200px" src="/images/logo_text.png" alt="logo" />
      <p>Listener Count: {listenerCount}</p>
      <p>Currently Playing: {trackInfo.title}</p>
      <img src={trackInfo.image} alt={trackInfo.title} />

      <div>
        {trackInfo && (
          <audio ref={setAudioElement} controls crossOrigin="anonymous" style={{ display: "none" }}>
            Your browser does not support the
            <code>audio</code> element.
            <source src={`${ROOT_URL_V1}/stream`} type="audio/mpeg" />
            <track kind="captions" />
          </audio>
        )}
        {tunedIn ? (
          <span onClick={() => setTunedIn(false)}>
            <Playing width="200px" height="200px" stroke="#00ff00" />
          </span>
        ) : (
          <span onClick={() => setTunedIn(true)}>
            <NotPlaying width="200px" height="200px" stroke="#00a1ff55" />
          </span>
        )}
      </div>
    </div>
  );
};

export default HomePage;
