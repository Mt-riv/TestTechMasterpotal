import { useContext } from "react";
import { useLocation, useRoute } from "wouter";
import { AppContext } from "../context/AppContext";
import { categories } from "../data/categories";
import { techniques } from "../data/techniques";
import { 
  Layers, Box, Code, Lightbulb, 
  Puzzle, Equal, BoxSelect, 
  Table, Shuffle, CheckSquare, Book, 
  GraduationCap, ExternalLink 
} from "lucide-react";

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar, setCategoryFilter, categoryFilter } = useContext(AppContext);
  const [location, setLocation] = useLocation();
  
  // Get popular techniques - first 5 from the techniques array
  const popularTechniques = techniques.slice(0, 5);
  
  // Get icon based on category
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'all': return <Layers className="mr-3 h-5 w-5" />;
      case 'blackbox': return <Box className="mr-3 h-5 w-5" />;
      case 'whitebox': return <Code className="mr-3 h-5 w-5" />;
      case 'experience': return <Lightbulb className="mr-3 h-5 w-5" />;
      case 'specialized': return <Puzzle className="mr-3 h-5 w-5" />;
      default: return <Layers className="mr-3 h-5 w-5" />;
    }
  };
  
  // Get technique icon based on technique id
  const getTechniqueIcon = (id: string) => {
    switch (id) {
      case 'equivalence-partitioning': return <Equal className="mr-3 h-5 w-5 text-gray-400" />;
      case 'boundary-value-analysis': return <BoxSelect className="mr-3 h-5 w-5 text-gray-400" />;
      case 'decision-table': return <Table className="mr-3 h-5 w-5 text-gray-400" />;
      case 'state-transition': return <Shuffle className="mr-3 h-5 w-5 text-gray-400" />;
      case 'statement-coverage': return <CheckSquare className="mr-3 h-5 w-5 text-gray-400" />;
      default: return <Layers className="mr-3 h-5 w-5 text-gray-400" />;
    }
  };

  // カテゴリーをクリックしたときの処理
  const handleCategoryClick = (categoryId: string) => {
    setCategoryFilter(categoryId);
    // wouter の setLocation でルーティング
    if (categoryId === 'all') {
      setLocation('/');
    } else {
      setLocation(`/category/${categoryId}`);
    }
    // モバイル表示の場合はサイドバーを閉じる
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
    console.log("Category clicked:", categoryId);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 md:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 pt-16 pb-4 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto flex-shrink-0 shadow-lg overflow-y-auto ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="px-4 mt-6">
        <h3 className="text-sm font-bold text-primary uppercase tracking-wider px-3 mb-2">カテゴリー</h3>
        <div className="mt-2 space-y-1">
          {categories.map((category) => (
            <div key={category.id}>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick(category.id);
                }}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                  categoryFilter === category.id
                    ? "bg-gradient-to-r from-primary/15 to-purple-500/15 text-primary-600 dark:text-primary-400 font-bold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-primary-400"
                }`}
              >
                {getCategoryIcon(category.id)}
                <span>{category.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-8">
        <h3 className="text-sm font-bold text-primary uppercase tracking-wider px-3 mb-2">人気の技法</h3>
        <div className="mt-2 space-y-1">
          {popularTechniques.map(technique => (
            <div key={technique.id}>
              <div
                onClick={(e) => {
                  // wouter の setLocation でルーティング
                  setLocation(`/technique/${technique.id}`);
                  // モバイル表示の場合はサイドバーを閉じる
                  if (window.innerWidth < 1024) {
                    toggleSidebar();
                  }
                  console.log("Technique clicked:", technique.id);
                }}
                className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-primary dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-primary-400 transition-all cursor-pointer"
              >
                {getTechniqueIcon(technique.id)}
                <span>{technique.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-8">
        <h3 className="text-sm font-bold text-primary uppercase tracking-wider px-3 mb-2">リソース</h3>
        <div className="mt-2 space-y-1">
          <button 
            className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-primary dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-primary-400 transition-all cursor-pointer"
          >
            <Book className="mr-3 h-5 w-5 text-primary/70" />
            <span>テスト技法ガイド</span>
          </button>
          <button 
            className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-primary dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-primary-400 transition-all cursor-pointer"
          >
            <GraduationCap className="mr-3 h-5 w-5 text-primary/70" />
            <span>学習パス</span>
          </button>
          <button 
            className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-primary dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-primary-400 transition-all cursor-pointer"
          >
            <ExternalLink className="mr-3 h-5 w-5 text-primary/70" />
            <span>外部リンク集</span>
          </button>
        </div>
      </div>
      
      <div className="px-4 mt-12">
        <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg p-4">
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">テスト技法の学習</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">体系的なテスト設計で品質を向上させましょう</p>
          <button className="button-gradient text-xs py-1 w-full">ガイドを見る</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
