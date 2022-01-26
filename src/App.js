// import logo from './logo.svg';

import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./theme/GlobalStyles";
import { createBrowserHistory } from "history";
import WebFont from "webfontloader";
import { useTheme } from "./theme/useTheme";
import { Router } from "react-router";
import Routes from "./routes/Routes";
import GlobalContextProvider from "./context/GlobalContext";
import AuthContexProvider from "./context/AuthContext";
import ParameterContextProvider from "./context/Parametercontext";

const browserHistory = createBrowserHistory({ basename: "/" });

function App() {
  const { theme, themeLoaded, getFonts } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts(),
      },
    });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setSelectedTheme(theme);
    // eslint-disable-next-line
  }, [themeLoaded]);

  return (
    <>
      {themeLoaded && (
        <ThemeProvider theme={selectedTheme}>
          <GlobalStyles />
          <GlobalContextProvider>
            <AuthContexProvider>
              <ParameterContextProvider>
                <Router history={browserHistory}>
                  <Routes />
                </Router>
              </ParameterContextProvider>
            </AuthContexProvider>
          </GlobalContextProvider>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
