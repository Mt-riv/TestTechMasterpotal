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
import { useTheme } from "./hooks/useTheme";

function App() {
  const { isDarkMode } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/category/:category" component={CategoryView} />
              <Route path="/technique/:id" component={TechniqueDetail} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
