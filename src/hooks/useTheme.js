// src/hooks/useTheme.js
import { useThemeStore } from '../store/ThemeStore';

/**
 * Convenience hook that provides the current theme and a toggle function.
 * Uses the ThemeStore which currently supports 'dark' and 'light' themes.
 */
export function useTheme() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return { theme, setTheme, toggleTheme };
}