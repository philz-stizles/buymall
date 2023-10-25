import { PropsWithChildren, createContext, useCallback, useState } from 'react';

enum Theme {
  dark,
  light,
}

export const ThemeContext = createContext({
  theme: Theme.light,
  setDarkTheme: () => {},
  setLightTheme: () => {},
});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState(Theme.light);

  const setDarkTheme = useCallback(() => {
    setTheme(Theme.dark);
  }, []);

  const setLightTheme = useCallback(() => {
    setTheme(Theme.light);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setDarkTheme, setLightTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
