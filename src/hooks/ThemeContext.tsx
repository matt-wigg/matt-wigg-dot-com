'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

// export const ThemeProvider: React.FC = ({ children }) => {
//   const [isDark, setIsDark] = useState(true);

//   useEffect(() => {
//     const currentTheme = isDark ? 'dark' : 'light';
//     // localStorage.setItem('theme', currentTheme);
//     document.documentElement.classList.toggle('dark', isDark);
//   }, [isDark]);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     const handleChange = () => {
//       setIsDark(mediaQuery.matches);
//     };
//     mediaQuery.addEventListener('change', handleChange);
//     return () => {
//       mediaQuery.removeEventListener('change', handleChange);
//     };
//   }, []);

// ... other code ...

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const applyTheme = (dark: boolean) => {
      setIsDark(dark);
      setIsLoading(false);
    };

    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        applyTheme(savedTheme === 'dark');
      } else {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        applyTheme(mediaQuery.matches);
        mediaQuery.addEventListener('change', (e) => {
          applyTheme(e.matches);
        });
        return () => {
          mediaQuery.removeEventListener('change', (e) => {
            applyTheme(e.matches);
          });
        };
      }
    }
  }, []);

  useEffect(() => {
    if (isDark !== null) {
      const currentTheme = isDark ? 'dark' : 'light';
      localStorage.setItem('theme', currentTheme);
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, [isDark]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setIsDark(mediaQuery.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setIsDark((prevIsDark) => !prevIsDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark: isDark ?? false, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
