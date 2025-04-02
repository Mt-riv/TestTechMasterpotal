import { useContext } from "react";
import SearchBar from "./SearchBar";
import { AppContext } from "../context/AppContext";
import { Sun, Moon, Menu } from "lucide-react";

const Header = () => {
  const { isDarkMode, toggleDarkMode, isSidebarOpen, toggleSidebar } = useContext(AppContext);

  return (
    <header className="bg-white shadow-sm dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar} 
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700 focus:outline-none"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="ml-3 text-xl font-semibold text-primary-600 dark:text-primary-400">
              ソフトウェアテスト技法ライブラリ
            </h1>
          </div>
          <div className="flex items-center">
            <div className="mr-4">
              <SearchBar />
            </div>
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700 focus:outline-none"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
