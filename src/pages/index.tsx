import styles from "./index.module.css";
import { ROOT_URL_V1 } from "@/constants";
import useListenerCount from "@/hooks/useListenerCount";

const HomePage = (): JSX.Element => {
  const urlWithProxy = `${ROOT_URL_V1}/version`;

  console.log("urlWithProxy", urlWithProxy);

  const { listenerCount } = useListenerCount("listeners_count");

  return (
    <div className={styles.app}>
      <img src="/images/logo_text.png" alt="logo" />
      <p>Listener Count: {listenerCount}</p>
    </div>
  );
};

export default HomePage;
