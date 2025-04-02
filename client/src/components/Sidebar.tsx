import { useContext } from "react";
import { Link, useLocation } from "wouter";
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
  const { isSidebarOpen, setCategoryFilter, categoryFilter } = useContext(AppContext);
  const [location] = useLocation();
  
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

  const handleCategoryClick = (categoryId: string) => {
    setCategoryFilter(categoryId);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-10 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 pt-16 pb-4 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto overflow-y-auto flex-shrink-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="px-4 mt-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">カテゴリー</h3>
        <div className="mt-2 -mx-3 space-y-1">
          {categories.map((category) => (
            <Link key={category.id} href={category.id === 'all' ? '/' : `/category/${category.id}`}>
              <a
                onClick={() => handleCategoryClick(category.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  categoryFilter === category.id
                    ? "bg-primary-50 text-primary-600 dark:bg-primary-900 dark:bg-opacity-20 dark:text-primary-400"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                }`}
              >
                {getCategoryIcon(category.id)}
                <span>{category.name}</span>
              </a>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4 mt-8">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">人気の技法</h3>
        <div className="mt-2 -mx-3 space-y-1">
          {popularTechniques.map(technique => (
            <Link key={technique.id} href={`/technique/${technique.id}`}>
              <a className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200">
                {getTechniqueIcon(technique.id)}
                <span>{technique.name}</span>
              </a>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4 mt-8">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">リソース</h3>
        <div className="mt-2 -mx-3 space-y-1">
          <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200">
            <Book className="mr-3 h-5 w-5 text-gray-400" />
            <span>テスト技法ガイド</span>
          </a>
          <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200">
            <GraduationCap className="mr-3 h-5 w-5 text-gray-400" />
            <span>学習パス</span>
          </a>
          <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200">
            <ExternalLink className="mr-3 h-5 w-5 text-gray-400" />
            <span>外部リンク集</span>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
