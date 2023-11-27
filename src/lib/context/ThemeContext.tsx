import React, { FC, createContext, useEffect, useState } from "react";

interface IThemeContext {
  isDarkMode: boolean;
  toggle: () => void;
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);
const { Provider } = ThemeContext;

interface IThemeProvider {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: IThemeProvider) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  // check if user has set a preference for dark mode in local storage
  useEffect(() => {
    const isDarkMode = localStorage.getItem("isDarkMode");
    if (isDarkMode) {
      setIsDarkMode(JSON.parse(isDarkMode));
      return;
    }

    // if they have not set a preference, check if their OS is set to dark mode
    const isDarkModeOS = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(isDarkModeOS);
  }, []);

  // update local storage when isDarkMode changes
  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return <Provider value={{ isDarkMode, toggle }}>{children}</Provider>;
};
