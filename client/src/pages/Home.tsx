import { useContext, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { AppContext } from "../context/AppContext";
import { categories } from "../data/categories";
import { techniques } from "../data/techniques";
import { filterTechniques } from "../hooks/useSearch";
import { CheckCircle, Box, Code, Lightbulb, Puzzle, ChevronRight } from "lucide-react";

const Home = () => {
  const { searchQuery, categoryFilter, setCategoryFilter } = useContext(AppContext);
  const [, setLocation] = useLocation();

  // If there's a search query or category filter (not 'all'), show filtered results
  const shouldShowFilteredResults = searchQuery || (categoryFilter !== 'all');
  const filteredTechniques = filterTechniques(techniques, searchQuery, categoryFilter);

  const handleCategoryClick = (categoryId: string) => {
    setCategoryFilter(categoryId);
    setLocation(`/category/${categoryId}`);
  };

  // When the component mounts, reset category filter to 'all' if arriving directly at the homepage
  useEffect(() => {
    if (!searchQuery && categoryFilter !== 'all') {
      setCategoryFilter('all');
    }
  }, []);

  if (shouldShowFilteredResults) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {categoryFilter === 'blackbox' ? 'ブラックボックステスト技法' : 
             categoryFilter === 'whitebox' ? 'ホワイトボックステスト技法' : 
             categoryFilter === 'experience' ? '経験ベーステスト技法' : 
             categoryFilter === 'specialized' ? '特殊テスト技法' :
             'テスト技法の検索結果'}
          </h2>
          {searchQuery && <p className="text-gray-600 dark:text-gray-300">検索キーワード: "{searchQuery}"</p>}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredTechniques.map((technique) => (
            <Link key={technique.id} href={`/technique/${technique.id}`}>
              <a className="bg-white dark:bg-gray-800 shadow rounded-lg cursor-pointer hover:shadow-md transition duration-150 border border-gray-200 dark:border-gray-700">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{technique.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      technique.category === 'blackbox' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:bg-opacity-20 dark:text-primary-300' : 
                      technique.category === 'whitebox' ? 'bg-accent-100 text-accent-800 dark:bg-accent-900 dark:bg-opacity-20 dark:text-accent-300' :
                      technique.category === 'experience' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:bg-opacity-20 dark:text-amber-300' :
                      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:bg-opacity-20 dark:text-purple-300'
                    }`}>
                      {technique.categoryName}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{technique.shortDescription}</p>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400 mr-4">
                      <i className="fas fa-chart-bar mr-1"></i> 効果: {technique.effectiveness}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      <i className="fas fa-bolt mr-1"></i> 複雑度: {technique.complexity}
                    </span>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Welcome Screen
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">ソフトウェアテスト技法を体系的に学ぶ</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">効果的なテストケースを設計するための様々な技法を探索してください</p>
      </div>

      {/* Category Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {/* BlackBox Testing Card */}
        <div 
          onClick={() => handleCategoryClick('blackbox')} 
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition duration-150 border border-gray-200 dark:border-gray-700"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 dark:bg-opacity-20 rounded-md p-3">
                <Box className="text-primary-600 dark:text-primary-400 h-6 w-6" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">ブラックボックステスト</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">プログラムの内部構造を意識せず、外部仕様に基づくテスト</p>
              </div>
            </div>
            <div className="mt-4">
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-secondary-500 mr-2" />
                  <span>同値分割法</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-secondary-500 mr-2" />
                  <span>境界値分析</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-secondary-500 mr-2" />
                  <span>デシジョンテーブル</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400 flex items-center">
              詳細を見る
              <ChevronRight className="h-4 w-4 ml-1" />
            </span>
          </div>
        </div>

        {/* WhiteBox Testing Card */}
        <div 
          onClick={() => handleCategoryClick('whitebox')} 
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition duration-150 border border-gray-200 dark:border-gray-700"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-accent-100 dark:bg-accent-900 dark:bg-opacity-20 rounded-md p-3">
                <Code className="text-accent-500 dark:text-accent-400 h-6 w-6" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">ホワイトボックステスト</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">プログラムの内部構造を意識したテスト</p>
              </div>
            </div>
            <div className="mt-4">
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-secondary-500 mr-2" />
                  <span>命令網羅</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-secondary-500 mr-2" />
                  <span>分岐網羅</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-secondary-500 mr-2" />
                  <span>条件網羅</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400 flex items-center">
              詳細を見る
              <ChevronRight className="h-4 w-4 ml-1" />
            </span>
          </div>
        </div>

        {/* Experience Based Testing Card */}
        <div 
          onClick={() => handleCategoryClick('experience')}
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition duration-150 border border-gray-200 dark:border-gray-700"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-amber-100 dark:bg-amber-900 dark:bg-opacity-20 rounded-md p-3">
                <Lightbulb className="text-amber-500 dark:text-amber-400 h-6 w-6" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">経験ベーステスト</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">テスターの知識と経験に基づくテスト</p>
              </div>
            </div>
            <div className="mt-4">
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-secondary-500 mr-2" />
                  <span>エラー推測法</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-secondary-500 mr-2" />
                  <span>探索的テスト</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-secondary-500 mr-2" />
                  <span>チェックリストベース</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400 flex items-center">
              詳細を見る
              <ChevronRight className="h-4 w-4 ml-1" />
            </span>
          </div>
        </div>

        {/* Specialized Testing Card */}
        <div 
          onClick={() => handleCategoryClick('specialized')}
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition duration-150 border border-gray-200 dark:border-gray-700"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20 rounded-md p-3">
                <Puzzle className="text-purple-500 dark:text-purple-400 h-6 w-6" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">特殊テスト技法</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">特定のケースに対応する専門的なテスト</p>
              </div>
            </div>
            <div className="mt-4">
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-secondary-500 mr-2" />
                  <span>ペアワイズテスト</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-secondary-500 mr-2" />
                  <span>セキュリティテスト</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-secondary-500 mr-2" />
                  <span>パフォーマンステスト</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400 flex items-center">
              詳細を見る
              <ChevronRight className="h-4 w-4 ml-1" />
            </span>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="mt-12 bg-white dark:bg-gray-800 shadow sm:rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">クイックスタートガイド</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
            <p>効果的なテストケース設計のための基本的なステップをご紹介します。</p>
          </div>
          <div className="mt-5">
            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 dark:bg-opacity-20 text-primary-600 dark:text-primary-400">
                    1
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">テスト対象を理解する</h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">システムの機能やユーザーの期待値を明確にしましょう。</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 dark:bg-opacity-20 text-primary-600 dark:text-primary-400">
                    2
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">適切なテスト技法を選択する</h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">テスト対象の特性に基づいて最適な技法を選びましょう。</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 dark:bg-opacity-20 text-primary-600 dark:text-primary-400">
                    3
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">テストケースを設計する</h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">選択した技法に基づいてテストケースを設計しましょう。</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 dark:bg-opacity-20 text-primary-600 dark:text-primary-400">
                    4
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">テストを実行して結果を評価する</h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">テストを実行し、期待通りの結果が得られるか確認しましょう。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} ソフトウェアテスト技法ライブラリ. All rights reserved.</p>
        <p className="mt-1">参考文献：ISTQB Foundation Level Syllabus, IEEE 829, ISO/IEC/IEEE 29119</p>
      </footer>
    </div>
  );
};

export default Home;
