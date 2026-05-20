import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("devfolioTheme") || "light";
  });

  useEffect(() => {
    document.body.dataset.theme = mode;
    localStorage.setItem("devfolioTheme", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((current) => (current === "light" ? "dark" : "light"));
  };

  const value = useMemo(
    () => ({
      mode,
      toggleTheme
    }),
    [mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
