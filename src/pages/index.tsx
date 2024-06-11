// import { useState } from "react";
import styles from "./index.module.css";
import { ROOT_URL } from "@/constants";

const HomePage = (): JSX.Element => {
  const urlWithProxy = `${ROOT_URL}version`;
  console.log("urlWithProxy", urlWithProxy);

  return (
    <div className={styles.app}>
      <img src="/images/logo_text.png" alt="logo" />
    </div>
  );
};

export default HomePage;
