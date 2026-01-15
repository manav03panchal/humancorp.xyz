import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Font = 'jetbrains' | 'ibm' | 'fira' | 'source' | 'system';
type Tint = 'green' | 'blue' | 'red' | 'yellow' | 'purple' | 'orange' | 'pink';

interface ThemeContextType {
  theme: Theme;
  font: Font;
  tint: Tint;
  setTheme: (theme: Theme) => void;
  setFont: (font: Font) => void;
  setTint: (tint: Tint) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const FONTS: { value: Font; label: string }[] = [
  { value: 'jetbrains', label: 'JetBrains Mono' },
  { value: 'ibm', label: 'IBM Plex Mono' },
  { value: 'fira', label: 'Fira Code' },
  { value: 'source', label: 'Source Code Pro' },
  { value: 'system', label: 'System Mono' },
];

export const TINTS: { value: Tint; label: string; color: string }[] = [
  { value: 'green', label: 'Green', color: '#00d26a' },
  { value: 'blue', label: 'Blue', color: '#0047ff' },
  { value: 'red', label: 'Red', color: '#ff0000' },
  { value: 'yellow', label: 'Yellow', color: '#d4a500' },
  { value: 'purple', label: 'Purple', color: '#8000ff' },
  { value: 'orange', label: 'Orange', color: '#ff6b00' },
  { value: 'pink', label: 'Pink', color: '#ff00ff' },
];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [font, setFontState] = useState<Font>(() => {
    if (typeof window === 'undefined') return 'jetbrains';
    return (localStorage.getItem('font') as Font) || 'jetbrains';
  });

  const [tint, setTintState] = useState<Tint>(() => {
    if (typeof window === 'undefined') return 'green';
    return (localStorage.getItem('tint') as Tint) || 'green';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-font', font);
    document.documentElement.setAttribute('data-tint', tint);
    localStorage.setItem('theme', theme);
    localStorage.setItem('font', font);
    localStorage.setItem('tint', tint);
  }, [theme, font, tint]);

  const setTheme = useCallback((newTheme: Theme) => setThemeState(newTheme), []);
  const setFont = useCallback((newFont: Font) => setFontState(newFont), []);
  const setTint = useCallback((newTint: Tint) => setTintState(newTint), []);
  const toggleTheme = useCallback(() => setThemeState(prev => prev === 'light' ? 'dark' : 'light'), []);

  return (
    <ThemeContext.Provider value={{ theme, font, tint, setTheme, setFont, setTint, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
