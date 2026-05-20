import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type ThemeMode =
  | "light"
  | "dark";

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme:
    () => void;
}

const ThemeContext =
  createContext<
    ThemeContextType | undefined
  >(undefined);

interface Props {
  children: ReactNode;
}

export const ThemeProvider =
  ({
    children,
  }: Props) => {
    const [theme, setTheme] =
      useState<ThemeMode>(
        () =>
          (localStorage.getItem(
            "theme"
          ) as ThemeMode) ||
          "light"
      );

    useEffect(() => {
      localStorage.setItem(
        "theme",
        theme
      );

      document.documentElement.classList.toggle(
        "dark",
        theme === "dark"
      );
    }, [theme]);

    const toggleTheme =
      (): void => {
        setTheme((prev) =>
          prev === "light"
            ? "dark"
            : "light"
        );
      };

    return (
      <ThemeContext.Provider
        value={{
          theme,
          toggleTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  };

export const useTheme =
  (): ThemeContextType => {
    const context =
      useContext(
        ThemeContext
      );

    if (!context) {
      throw new Error(
        "useTheme must be used inside ThemeProvider"
      );
    }

    return context;
  };

export { ThemeContext };