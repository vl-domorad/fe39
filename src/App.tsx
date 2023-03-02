import React, { useState } from "react";

import ThemeProvider from "./context/Theme/Provider";
import { Theme } from "./context/Theme/Context";
import Router from "./pages/Router";

const App = () => {
  const [theme, setTheme] = useState(Theme.Dark);

  const onChangeTheme = (value: Theme) => {
    setTheme(value);
  };

  return (
    <ThemeProvider theme={theme} onChangeTheme={onChangeTheme}>
      <Router />
    </ThemeProvider>
  );
};

export default App;
