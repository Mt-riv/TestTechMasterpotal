import { HelpCircle } from "lucide-react";
import SearchBar from "./SearchBar";
import { Button } from "@/components/ui/button";
import { useTutorial } from "@/context/TutorialContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Header = () => {
  const { openTutorial, hasCompletedTutorial } = useTutorial();

  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <div className="flex-1 flex items-center">
            <h1 className="text-xl sm:text-lg md:text-xl font-bold gradient-heading break-words mr-4" style={{ fontSize: 'clamp(10pt, 4vw, 20pt)', maxWidth: 'calc(100% - 10px)' }}>
              ソフトウェアテスト技法ライブラリ
            </h1>
          </div>
          <div className="flex items-center space-x-4 flex-shrink-0">
            <div className="hidden sm:block">
              <SearchBar />
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full flex-shrink-0"
                    onClick={openTutorial}
                    aria-label="チュートリアルを開始"
                  >
                    <HelpCircle className="h-5 w-5" />
                    {!hasCompletedTutorial && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-600 rounded-full animate-pulse" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>チュートリアルを開始</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <div className="block sm:hidden border-t border-gray-200 px-4 py-2">
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
