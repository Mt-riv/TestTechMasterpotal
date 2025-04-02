import { useContext } from "react";
import SearchBar from "./SearchBar";
import { AppContext } from "../context/AppContext";
import { Sun, Moon, Menu } from "lucide-react";

const Header = () => {
  const { isDarkMode, toggleDarkMode, isSidebarOpen, toggleSidebar } = useContext(AppContext);

  return (
    <header className="bg-white shadow-md dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar} 
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="ml-3 text-xl font-bold gradient-heading">
              ソフトウェアテスト技法ライブラリ
            </h1>
          </div>
          <div className="flex items-center">
            <div className="mr-4">
              <SearchBar />
            </div>
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
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
