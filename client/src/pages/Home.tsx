import { useContext, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { AppContext } from "../context/AppContext";
import { categories } from "../data/categories";
import { techniques } from "../data/techniques";
import { filterTechniques } from "../hooks/useSearch";
import { useTutorial } from "../context/TutorialContext";
import { getCategoryColorClass, getCategoryCardClass, getCategoryIconClass } from "../lib/utils";
import { CheckCircle, Box, Code, Lightbulb, Puzzle, ChevronRight } from "lucide-react";

const Home = () => {
  const { searchQuery, categoryFilter, setCategoryFilter } = useContext(AppContext);
  const { openTutorial, hasCompletedTutorial } = useTutorial();
  const [, setLocation] = useLocation();
  
  // チュートリアルの自動起動はApp.tsxで一元管理するため、ここでの実装は削除

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
          <h2 className="gradient-heading mb-4">
            {categoryFilter === 'blackbox' ? 'ブラックボックステスト技法' : 
             categoryFilter === 'whitebox' ? 'ホワイトボックステスト技法' : 
             categoryFilter === 'experience' ? '経験ベーステスト技法' : 
             categoryFilter === 'specialized' ? '特殊テスト技法' :
             'テスト技法の検索結果'}
          </h2>
          {searchQuery && <p className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 p-2 rounded-md inline-block">
            検索キーワード: <span className="font-bold">"{searchQuery}"</span>
          </p>}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredTechniques.map((technique) => (
            <Link key={technique.id} href={`/technique/${technique.id}`} className="card-hover bg-white dark:bg-gray-800 shadow-md rounded-lg cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{technique.name}</h3>
                    <span className={`category-badge ${getCategoryColorClass(technique.category)}`}>
                      {technique.categoryName}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{technique.shortDescription}</p>
                  <div className="mt-4 flex items-center text-sm bg-gray-50 dark:bg-gray-700/50 p-2 rounded-md">
                    <span className="text-gray-700 dark:text-gray-300 mr-4 font-medium">
                      効果: <span className="text-primary">{technique.effectiveness}</span>
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      複雑度: <span className="text-primary">{technique.complexity}</span>
                    </span>
                  </div>
                </div>
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
        <h1 className="gradient-heading mb-4 text-2xl md:text-3xl">ソフトウェアテスト技法を体系的に学ぶ</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">効果的なテストケース設計のための様々な技法を探索してください</p>
      </div>

      {/* Category Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {/* BlackBox Testing Card */}
        <div 
          onClick={() => handleCategoryClick('blackbox')} 
          className={`category-card card-hover bg-white dark:bg-gray-800 overflow-hidden shadow-md rounded-lg cursor-pointer border ${getCategoryCardClass('blackbox')} flex flex-col h-full`}
        >
          <div className="p-5 flex-grow">
            <div className="flex items-center">
              <div className={`${getCategoryIconClass('blackbox')} p-3 rounded-lg`}>
                <Box className="h-6 w-6" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">ブラックボックステスト</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">プログラムの内部構造を意識せず、外部仕様に基づくテスト</p>
              </div>
            </div>
            <div className="mt-4">
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>同値分割法</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>境界値分析</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>デシジョンテーブル</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span style={{ wordBreak: 'keep-all' }}>クラシフィケーション<wbr />ツリー</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>状態遷移テスト</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 px-5 py-3 mt-auto">
            <span className="text-sm font-medium text-red-700 dark:text-red-300 flex items-center">
              詳細を見る
              <ChevronRight className="h-4 w-4 ml-1" />
            </span>
          </div>
        </div>

        {/* WhiteBox Testing Card */}
        <div 
          onClick={() => handleCategoryClick('whitebox')} 
          className={`category-card card-hover bg-white dark:bg-gray-800 overflow-hidden shadow-md rounded-lg cursor-pointer border ${getCategoryCardClass('whitebox')} flex flex-col h-full`}
        >
          <div className="p-5 flex-grow">
            <div className="flex items-center">
              <div className={`${getCategoryIconClass('whitebox')} p-3 rounded-lg`}>
                <Code className="h-6 w-6" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">ホワイトボックステスト</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">プログラムの内部構造を意識したテスト</p>
              </div>
            </div>
            <div className="mt-4">
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>命令網羅</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>分岐網羅</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>条件網羅</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 px-5 py-3 mt-auto">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center">
              詳細を見る
              <ChevronRight className="h-4 w-4 ml-1" />
            </span>
          </div>
        </div>

        {/* Experience Based Testing Card */}
        <div 
          onClick={() => handleCategoryClick('experience')}
          className={`category-card card-hover bg-white dark:bg-gray-800 overflow-hidden shadow-md rounded-lg cursor-pointer border ${getCategoryCardClass('experience')} flex flex-col h-full`}
        >
          <div className="p-5 flex-grow">
            <div className="flex items-center">
              <div className={`${getCategoryIconClass('experience')} p-3 rounded-lg`}>
                <Lightbulb className="h-6 w-6" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">経験ベーステスト</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">テスターの知識と経験に基づくテスト</p>
              </div>
            </div>
            <div className="mt-4">
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>エラー推測法</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>探索的テスト</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>チェックリストベース</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 px-5 py-3 mt-auto">
            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300 flex items-center">
              詳細を見る
              <ChevronRight className="h-4 w-4 ml-1" />
            </span>
          </div>
        </div>

        {/* Specialized Testing Card */}
        <div 
          onClick={() => handleCategoryClick('specialized')}
          className={`category-card card-hover bg-white dark:bg-gray-800 overflow-hidden shadow-md rounded-lg cursor-pointer border ${getCategoryCardClass('specialized')} flex flex-col h-full`}
        >
          <div className="p-5 flex-grow">
            <div className="flex items-center">
              <div className={`${getCategoryIconClass('specialized')} p-3 rounded-lg`}>
                <Puzzle className="h-6 w-6" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">特殊テスト技法</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">特定のケースに対応する専門的なテスト</p>
              </div>
            </div>
            <div className="mt-4">
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>ペアワイズテスト</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>セキュリティテスト</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>パフォーマンステスト</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 px-5 py-3 mt-auto">
            <span className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center">
              詳細を見る
              <ChevronRight className="h-4 w-4 ml-1" />
            </span>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="mt-12 bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden card-hover">
        <div className="px-6 py-6">
          <h3 className="section-title text-xl gradient-heading">クイックスタートガイド</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
            <p>効果的なテストケース設計のための基本的なステップをご紹介します。</p>
          </div>
          <div className="mt-6">
            <div className="space-y-5">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-primary to-purple-500 text-white font-bold">
                    1
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-bold text-gray-900 dark:text-white">テスト対象を理解する</h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">システムの機能やユーザーの期待値を明確にしましょう。</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 text-white font-bold">
                    2
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-bold text-gray-900 dark:text-white">適切なテスト技法を選択する</h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">テスト対象の特性に基づいて最適な技法を選びましょう。</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 text-white font-bold">
                    3
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-bold text-gray-900 dark:text-white">テストケースを設計する</h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">選択した技法に基づいてテストケースを設計しましょう。</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 text-white font-bold">
                    4
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-bold text-gray-900 dark:text-white">テストを実行して結果を評価する</h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">テストを実行し、期待通りの結果が得られるか確認しましょう。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center p-6 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/10 dark:to-purple-800/10 rounded-lg">
        <p className="font-medium text-gray-700 dark:text-gray-300">© {new Date().getFullYear()} ソフトウェアテスト技法ライブラリ by YamaY. All rights reserved.</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">参考文献：ISTQB Foundation Level Syllabus, IEEE 829, ISO/IEC/IEEE 29119</p>
      </footer>
    </div>
  );
};

export default Home;
