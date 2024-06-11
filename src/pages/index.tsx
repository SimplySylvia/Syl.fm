import { useState } from "react";
import styles from "./index.module.css";
import { ROOT_URL } from "@/constants";
import { commonExample } from "@/utils/utils";

const HomePage = (): JSX.Element => {
  const urlWithProxy = `${ROOT_URL}version`;
  const [_data, setData] = useState<RespExampleType | null>(null);

  commonExample();

  async function _getDataFromServer(): Promise<void> {
    const res = await fetch(urlWithProxy);
    const data: RespExampleType = await res.json();
    setData(data);
  }

  return (
    <div className={styles.app}>
      <img src="/images/logo_text.png" alt="logo" />
    </div>
  );
};

export default HomePage;
