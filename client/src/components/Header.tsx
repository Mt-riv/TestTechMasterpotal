import { useContext } from "react";
import SearchBar from "./SearchBar";
import { AppContext } from "../context/AppContext";
import { Sun, Moon, Menu } from "lucide-react";

const Header = () => {
  const { isDarkMode, toggleDarkMode, isSidebarOpen, toggleSidebar } = useContext(AppContext);

  // ダークモード切り替え処理
  const handleDarkModeToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleDarkMode();
    console.log("Dark mode toggled:", !isDarkMode);
  };

  // サイドバー切り替え処理
  const handleSidebarToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleSidebar();
    // 正確なログを出力するために少し遅延させる
    setTimeout(() => {
      console.log("Sidebar toggled, new state:", !isSidebarOpen);
    }, 0);
  };

  return (
    <header className="bg-white shadow-md dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <button 
              onClick={handleSidebarToggle} 
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
              aria-label={isSidebarOpen ? "メニューを閉じる" : "メニューを開く"}
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="ml-3 text-xl font-bold gradient-heading truncate max-w-[180px] sm:max-w-md md:max-w-lg">
              ソフトウェアテスト技法ライブラリ by YamaY
            </h1>
          </div>
          <div className="flex items-center">
            <div className="mr-4 hidden sm:block">
              <SearchBar />
            </div>
            <button 
              onClick={handleDarkModeToggle} 
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
              aria-label={isDarkMode ? "ライトモードに切り替え" : "ダークモードに切り替え"}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      <div className="block sm:hidden border-t border-gray-200 dark:border-gray-700 px-4 py-2">
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
