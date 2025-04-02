import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CategoryView from "@/pages/CategoryView";
import TechniqueDetail from "@/pages/TechniqueDetail";
import Header from "./components/Header";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-white text-gray-800">
        <Header />
        <div className="flex flex-1 overflow-hidden relative">
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
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
    </QueryClientProvider>
  );
}

export default App;
