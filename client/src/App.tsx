import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CategoryView from "@/pages/CategoryView";
import TechniqueDetail from "@/pages/TechniqueDetail";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";

function App() {
  const { isDarkMode, isSidebarOpen, toggleSidebar } = useContext(AppContext);

  // ダークモードのクラスを適用
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // サイドバーオーバーレイクリック処理
  const handleOverlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleSidebar();
    console.log("Sidebar overlay clicked, hiding sidebar");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className={isDarkMode ? 'dark' : ''}>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
          <Header />
          <div className="flex flex-1 overflow-hidden relative">
            {/* モバイル向けオーバーレイ - サイドバーがオープンの時だけ表示 */}
            {isSidebarOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
                onClick={handleOverlayClick}
                aria-hidden="true"
              />
            )}
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
              <div className="max-w-7xl mx-auto">
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/category/:category" component={CategoryView} />
                  <Route path="/technique/:id" component={TechniqueDetail} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </main>
          </div>
          <Toaster />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
