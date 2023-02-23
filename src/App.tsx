import React from "react";

import styles from "./App.module.scss";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className={styles.container}>
      <Home />
    </div>
  );
};

export default App;
