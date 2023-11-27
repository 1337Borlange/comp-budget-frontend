import { useContext } from "react";
import { ThemeContext } from "../context";

export const useDarkMode = () => {
  const { isDarkMode, toggle } = useContext(ThemeContext);

  return { isDarkMode, toggle };
};
