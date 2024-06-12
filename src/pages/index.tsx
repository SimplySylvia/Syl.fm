import styles from "./index.module.css";
import useListenerCount from "@/hooks/useListenerCount";
import useTrackInfo from "@/hooks/useTrackInfo";
import { ROOT_URL_V1 } from "@/constants";

const HomePage = (): JSX.Element => {
  const { listenerCount } = useListenerCount("listeners_count");
  const { trackInfo } = useTrackInfo("track_changed");

  console.log("trackInfo", trackInfo);

  return (
    <div className={styles.app}>
      <img width="200px" src="/images/logo_text.png" alt="logo" />
      <p>Listener Count: {listenerCount}</p>
      <p>Currently Playing: {trackInfo.title}</p>
      <img src={trackInfo.image} alt={trackInfo.title} />

      <div>
        <audio controls crossOrigin="anonymous">
          Your browser does not support the
          <code>audio</code> element.
          <source src={`${ROOT_URL_V1}/stream`} type="audio/mpeg" />
          <track kind="captions" />
        </audio>
      </div>
    </div>
  );
};

export default HomePage;
