import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(undefined);

const themes = [
  'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 
  'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 
  'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 
  'wireframe', 'black', 'luxury', 'dracula'
];

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('careersn-theme');
    return savedTheme || 'corporate';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('careersn-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};