import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { techniques } from "../data/techniques";
import { categories } from "../data/categories";
import { exercises } from "../data/exercises";
import { ChevronRight, PlusCircle, MinusCircle, ArrowRight, CheckCircle, Book, Award, BarChart3, Clock } from "lucide-react";
import { ExerciseView } from "../components/exercise/ExerciseView";
import { BadgeDisplay } from "../components/exercise/BadgeDisplay";
import { Button } from "@/components/ui/button";
import { getUserBadges, getExerciseProgress } from "../services/ProgressService";
import { getCategoryColorClass, getCategoryCardClass, getCategoryIconClass } from "../lib/utils";

const TechniqueDetail = () => {
  const { id, exerciseId } = useParams();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState(exerciseId ? "exercise" : "overview");
  const [selectedExercise, setSelectedExercise] = useState<string | null>(exerciseId || null);
  const [userBadges, setUserBadges] = useState<any[]>([]);
  
  // Find the technique by id
  const technique = techniques.find(t => t.id === id);
  
  // Find the category for this technique
  const category = technique ? categories.find(c => c.id === technique.category) : null;
  
  // Find exercises for this technique
  const techniqueExercises = exercises.filter(e => e.techniqueId === id);

  // Load user badges
  useEffect(() => {
    // バッジの取得と表示
    const badges = getUserBadges();
    setUserBadges(badges);
    console.log(`TechniqueDetail - バッジ読み込み(技法ID: ${id}):`, badges.length);
    
    // 同じ技法関連のバッジだけフィルタして表示
    const techBadges = badges.filter(b => b.type === 'technique' && b.relatedId === id);
    console.log(`TechniqueDetail - この技法のバッジ:`, techBadges);
  }, [id]);
  
  if (!technique || !category) {
    return (
      <div className="max-w-3xl mx-auto text-center p-12 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 mt-12">
        <h2 className="text-2xl font-bold gradient-heading mb-4">テスト技法が見つかりません</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">指定されたテスト技法は存在しません。</p>
        <Link href="/">
          <a className="mt-8 inline-block px-5 py-3 bg-gradient-to-r from-purple-600 to-purple-400 text-white font-medium rounded-md hover:opacity-90 transition-opacity">
            ホームに戻る
          </a>
        </Link>
      </div>
    );
  }



  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex text-sm">
          <li>
            <Link href="/" className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 cursor-pointer">
              ホーム
            </Link>
          </li>
          <li className="mx-2 text-gray-500 dark:text-gray-400">
            <ChevronRight className="h-4 w-4" />
          </li>
          <li>
            <Link href={`/category/${technique.category}`} className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 cursor-pointer">
              {category.name}
            </Link>
          </li>
          <li className="mx-2 text-gray-500 dark:text-gray-400">
            <ChevronRight className="h-4 w-4" />
          </li>
          <li className="text-gray-700 dark:text-gray-300">{technique.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between">
          <h1 className="text-3xl font-bold gradient-heading">{technique.name}</h1>
          <span className={`mt-2 sm:mt-0 px-3 py-1 text-sm rounded-full category-badge ${getCategoryColorClass(technique.category)}`}>
            {category.name}
          </span>
        </div>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">{technique.shortDescription}</p>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px overflow-x-auto">
            <button 
              onClick={() => setActiveTab("overview")} 
              className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'overview' 
                ? 'border-purple-500 text-purple-600 dark:text-purple-400 dark:border-purple-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}`}
            >
              概要
            </button>
            <button 
              onClick={() => setActiveTab("example")} 
              className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'example' 
                ? 'border-purple-500 text-purple-600 dark:text-purple-400 dark:border-purple-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}`}
            >
              例
            </button>
            <button 
              onClick={() => setActiveTab("steps")} 
              className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'steps' 
                ? 'border-purple-500 text-purple-600 dark:text-purple-400 dark:border-purple-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}`}
            >
              適用手順
            </button>
            <button 
              onClick={() => setActiveTab("benefits")} 
              className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'benefits' 
                ? 'border-purple-500 text-purple-600 dark:text-purple-400 dark:border-purple-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}`}
            >
              メリット・デメリット
            </button>
            <button 
              onClick={() => setActiveTab("exercise")} 
              className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'exercise' 
                ? 'border-purple-500 text-purple-600 dark:text-purple-400 dark:border-purple-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}`}
            >
              <div className="flex items-center">
                <Book className="h-4 w-4 mr-1" />
                演習
              </div>
            </button>
            <button 
              onClick={() => setActiveTab("badges")} 
              className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'badges' 
                ? 'border-purple-500 text-purple-600 dark:text-purple-400 dark:border-purple-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}`}
            >
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-1" />
                バッジ
              </div>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{technique.name}とは</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {technique.description}
              </p>

              <div className="mt-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">基本原則</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  {technique.principles.map((principle, index) => (
                    <li key={index}>{principle}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 bg-gray-50 dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">適用に適したケース</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  {technique.suitableCases.map((suitableCase, index) => (
                    <li key={index}>{suitableCase}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">歴史と背景</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {technique.history}
                </p>
              </div>
            </div>
          )}

          {/* Example Tab */}
          {activeTab === "example" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{technique.name}の適用例</h2>
              
              {technique.examples.map((example, exIndex) => (
                <div key={exIndex} className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">例{exIndex + 1}: {example.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {example.description}
                  </p>

                  {example.steps && (
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-700 mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{example.steps.title}</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                        {example.steps.items.map((item, itemIndex) => (
                          <li key={itemIndex}><strong>{item.label}:</strong> {item.value}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {example.testCases && (
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{example.testCases.title}</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead>
                            <tr>
                              {example.testCases.headers.map((header, headerIndex) => (
                                <th key={headerIndex} className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {example.testCases.rows.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                  <td key={cellIndex} className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Steps Tab */}
          {activeTab === "steps" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{technique.name}の適用手順</h2>

              <div className="space-y-6">
                {technique.applicationSteps.map((step, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 dark:bg-opacity-30 rounded-full p-2">
                        <span className="h-6 w-6 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
                          {index + 1}
                        </span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{step.title}</h3>
                        <p className="mt-1 text-gray-700 dark:text-gray-300">
                          {step.description}
                        </p>
                        {step.example && (
                          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <p className="italic">{step.example}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits Tab */}
          {activeTab === "benefits" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{technique.name}のメリットとデメリット</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg p-5 border border-green-100 dark:border-green-800">
                  <h3 className="text-lg font-medium text-green-800 dark:text-green-400 mb-3">
                    <CheckCircle className="inline-block h-5 w-5 mr-2" />
                    メリット
                  </h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    {technique.benefits.map((benefit, index) => (
                      <li key={index} className="flex">
                        <PlusCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-1 mr-2" />
                        <span><strong>{benefit.title}</strong>：{benefit.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 rounded-lg p-5 border border-red-100 dark:border-red-800">
                  <h3 className="text-lg font-medium text-red-800 dark:text-red-400 mb-3">
                    <i className="fas fa-exclamation-circle mr-2"></i>
                    デメリット
                  </h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    {technique.drawbacks.map((drawback, index) => (
                      <li key={index} className="flex">
                        <MinusCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-1 mr-2" />
                        <span><strong>{drawback.title}</strong>：{drawback.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">効果的な使用方法</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {technique.effectiveUsage.map((usage, index) => (
                    <li key={index} className="flex">
                      <CheckCircle className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-1 mr-2" />
                      <span>{usage}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 p-4 rounded-md border border-yellow-100 dark:border-yellow-800">
                <h3 className="text-md font-medium text-yellow-800 dark:text-yellow-400 mb-2">関連する技法</h3>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                  {technique.relatedTechniques.map((relTechnique, index) => (
                    <li key={index} className="flex items-center">
                      <ArrowRight className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                      <Link href={`/technique/${relTechnique.id}`} className="text-primary-600 dark:text-primary-400 hover:underline cursor-pointer">
                        {relTechnique.name}
                      </Link>
                      <span className="ml-2">- {relTechnique.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Exercise Tab */}
          {activeTab === "exercise" && (
            <div>
              {selectedExercise ? (
                <div>
                  {/* 選択された演習を表示 */}
                  {techniqueExercises.filter(e => e.id === selectedExercise).map(exercise => (
                    <ExerciseView 
                      key={exercise.id} 
                      exercise={exercise} 
                      goBack={() => {
                        setSelectedExercise(null);
                        // URL from technique/id/exercise/exerciseId to technique/id 
                        navigate(`/technique/${id}`);
                      }} 
                    />
                  ))}
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    <div className="flex items-center">
                      <Book className="h-5 w-5 mr-2" />
                      {technique.name}の演習
                    </div>
                  </h2>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    以下の演習問題を通じて、{technique.name}のスキルを実践的に身につけましょう。
                    演習を完了すると、獲得したスキルの証としてバッジが授与されます。
                  </p>

                  {techniqueExercises.length > 0 ? (
                    <div className="space-y-6">
                      {techniqueExercises.map(exercise => {
                        const progress = getExerciseProgress(exercise.id);
                        
                        return (
                          <div 
                            key={exercise.id} 
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="p-6">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    {exercise.title}
                                  </h3>
                                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    {exercise.objective}
                                  </p>
                                </div>
                                {progress?.completed && (
                                  <div className="bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full border border-green-200 dark:border-green-800">
                                    <span className="text-sm font-medium text-green-700 dark:text-green-400 flex items-center">
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      完了
                                    </span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 gap-x-6 gap-y-2">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {exercise.estimatedTime}
                                </div>
                                <div className="flex items-center">
                                  <BarChart3 className="h-4 w-4 mr-1" />
                                  合格点: {exercise.passingScore}/{exercise.totalPoints}点
                                </div>
                              </div>
                              
                              <div className="mt-6 flex justify-end">
                                <Button
                                  onClick={() => {
                                    setSelectedExercise(exercise.id);
                                    // Update URL to include exerciseId
                                    navigate(`/technique/${id}/exercise/${exercise.id}`);
                                  }}
                                >
                                  {progress?.completed 
                                    ? "もう一度挑戦する" 
                                    : progress?.attemptCount 
                                      ? "続きから挑戦する" 
                                      : "演習に挑戦する"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                      <Book className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">演習がまだ準備されていません</h3>
                      <p className="text-gray-500 dark:text-gray-400">この技法の演習は現在準備中です。しばらくお待ちください。</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Badges Tab */}
          {activeTab === "badges" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  {technique.name}のバッジ
                </div>
              </h2>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                バッジは{technique.name}の理解と習熟を示す証です。
                演習を完了し、スキルを実証することでバッジを獲得できます。
              </p>
              
              <BadgeDisplay 
                badges={userBadges.filter(b => b.type === 'technique' && b.relatedId === id)}
                title={`${technique.name}のバッジ`}
                description={`${technique.name}の習得を証明するバッジです`}
                emptyMessage={`まだバッジを獲得していません。演習を完了して${technique.name}のスキルを証明しましょう！`}
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center p-6 bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-lg">
        <p className="font-medium text-gray-700 dark:text-gray-300">© {new Date().getFullYear()} ソフトウェアテスト技法ライブラリ by YamaY. All rights reserved.</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">参考文献：ISTQB Foundation Level Syllabus, IEEE 829, ISO/IEC/IEEE 29119</p>
      </footer>
    </div>
  );
};

export default TechniqueDetail;
