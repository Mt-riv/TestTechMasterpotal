import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export function useTheme() {
  const { isDarkMode, toggleDarkMode } = useContext(AppContext);
  
  return {
    isDarkMode,
    toggleDarkMode
  };
}
