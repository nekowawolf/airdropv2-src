'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {

    return {
      isDarkMode: false,
      toggleDarkMode: () => {
        console.warn('DarkModeProvider not ready yet');
      }
    };
  }
  return context;
}

export default function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const darkmode = localStorage.getItem('darkmode');
    if (darkmode === 'active') {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('darkmode');
      localStorage.setItem('darkmode', 'null');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('darkmode');
      localStorage.setItem('darkmode', 'active');
      setIsDarkMode(true);
    }
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
} 