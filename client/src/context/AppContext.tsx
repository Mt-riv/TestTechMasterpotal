import React, { createContext, useState, ReactNode } from 'react';

interface AppContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
}

const defaultContextValue: AppContextType = {
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
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const value = {
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
