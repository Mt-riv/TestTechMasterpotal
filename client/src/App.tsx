import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CategoryView from "@/pages/CategoryView";
import TechniqueDetail from "@/pages/TechniqueDetail";
import Header from "./components/Header";
import { TutorialProvider } from "./context/TutorialContext";
import TutorialWalkthrough from "./components/TutorialWalkthrough";
import { useTutorial } from "./context/TutorialContext";
import { AppProvider } from "./context/AppContext";

// Wrapper component to use the tutorial context hooks
const AppContent = () => {
  const { 
    isTutorialOpen, 
    closeTutorial, 
    completeTutorial, 
    tutorialSteps, 
    hasCompletedTutorial,
    openTutorial
  } = useTutorial();

  // Check localStorage to see if this is the first visit
  useEffect(() => {
    // Retrieve from localStorage
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial') === 'true';
    
    // If user has never seen the tutorial, show it automatically
    if (!hasSeenTutorial && !hasCompletedTutorial) {
      // Small delay to ensure everything is loaded
      const timer = setTimeout(() => {
        openTutorial();
        // Mark that user has seen the tutorial at least once
        localStorage.setItem('hasSeenTutorial', 'true');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [hasCompletedTutorial, openTutorial]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />
      <div className="flex flex-1 overflow-hidden relative">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/category/:category" component={CategoryView} />
              <Route path="/technique/:id/exercise/:exerciseId" component={TechniqueDetail} />
              <Route path="/technique/:id" component={TechniqueDetail} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </main>
      </div>
      <TutorialWalkthrough
        steps={tutorialSteps}
        isOpen={isTutorialOpen}
        onComplete={completeTutorial}
        onClose={closeTutorial}
      />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TutorialProvider>
          <AppContent />
        </TutorialProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
