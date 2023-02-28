import React, { useState } from "react";

import styles from "./App.module.scss";
import Home from "./pages/Home";
import ThemeProvider from "./context/Theme/Provider";
import { Theme } from "./context/Theme/Context";

const App = () => {
  const [theme, setTheme] = useState(Theme.Dark);

  const onChangeTheme = (value: Theme) => {
    setTheme(value);
  };

  return (
    <ThemeProvider theme={theme} onChangeTheme={onChangeTheme}>
      <Home />
    </ThemeProvider>
  );
};

export default App;
