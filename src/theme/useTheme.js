import { useEffect, useState } from "react";
import { setToLS, getFromLS } from "../utils";
import _ from "lodash";

export const useTheme = () => {
  const themes = getFromLS("all-themes");
  const [theme, setTheme] = useState(themes.main.light);
  const [themeLoaded, setThemeLoaded] = useState(false);

  const setMode = (mode) => {
    setToLS("theme", mode);
    setTheme(mode);
  };

  const getFonts = () => {
    const allFonts = _.values(_.mapValues(themes.main, "font"));
    return allFonts;
  };

  useEffect(() => {
    const localTheme = getFromLS("theme");
    localTheme ? setTheme(localTheme) : setTheme(themes.main.light);
    setThemeLoaded(true);
    // eslint-disable-next-line
  }, []);

  return { theme, themeLoaded, setMode, getFonts };
};
