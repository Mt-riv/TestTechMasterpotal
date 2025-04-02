import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AppContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
}

const defaultContextValue: AppContextType = {
  isDarkMode: false,
  toggleDarkMode: () => {},
  isSidebarOpen: true,
  toggleSidebar: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
  categoryFilter: 'all',
  setCategoryFilter: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContextValue);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Initialize dark mode from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    
    // Check system preference if no saved preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Initialize sidebar state based on screen width
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    // Only auto-open on desktop devices
    return window.innerWidth >= 1024;
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Set dark mode class on document when isDarkMode changes
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode.toString());
    // Document class approach - not using this because we're using a wrapper div in App.tsx
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle device resize - only auto-hide on mobile/tablet
  useEffect(() => {
    const handleResize = () => {
      // On mobile/tablet, hide sidebar when resizing
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Initial call
    handleResize();
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => {
      const newState = !prev;
      console.log("Toggling sidebar, current state:", prev, "new state:", newState);
      return newState;
    });
  };

  const value = {
    isDarkMode,
    toggleDarkMode,
    isSidebarOpen,
    toggleSidebar,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
