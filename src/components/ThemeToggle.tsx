import { FC } from "react";
import { useTheme } from "../ThemeProvider";

export const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};
