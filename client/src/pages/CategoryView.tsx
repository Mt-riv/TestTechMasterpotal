import { useContext, useEffect } from "react";
import { Link, useParams } from "wouter";
import { AppContext } from "../context/AppContext";
import { techniques } from "../data/techniques";
import { categories } from "../data/categories";
import { filterTechniques } from "../hooks/useSearch";
import { getCategoryColorClass } from "../lib/utils";

const CategoryView = () => {
  const { category } = useParams();
  const { setCategoryFilter } = useContext(AppContext);
  
  // Find the category by id
  const currentCategory = categories.find(cat => cat.id === category);
  
  // Filter techniques by the current category
  const filteredTechniques = filterTechniques(techniques, "", category || "all");

  // When category page loads, set the category filter
  useEffect(() => {
    if (category) {
      setCategoryFilter(category);
    }
  }, [category, setCategoryFilter]);

  if (!currentCategory) {
    return (
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900">カテゴリーが見つかりません</h2>
        <p className="mt-4 text-gray-600">指定されたカテゴリーは存在しません。</p>
        <Link href="/">
          <a className="mt-6 inline-block text-purple-600 hover:text-purple-800">
            ホームに戻る
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="gradient-heading text-2xl font-bold mb-2">{currentCategory.name}</h2>
        <p className="text-gray-600 dark:text-gray-300">{currentCategory.description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredTechniques.map((technique) => (
          <Link key={technique.id} href={`/technique/${technique.id}`} className="technique-item card-hover bg-white dark:bg-gray-800 shadow-md rounded-lg cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden block no-underline">
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
                    効果: <span className="text-purple-600 dark:text-purple-400">{technique.effectiveness}</span>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    複雑度: <span className="text-purple-600 dark:text-purple-400">{technique.complexity}</span>
                  </span>
                </div>
              </div>
          </Link>
        ))}
      </div>

      <footer className="mt-12 text-center p-6 bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-lg">
        <p className="font-medium text-gray-700 dark:text-gray-300">© {new Date().getFullYear()} ソフトウェアテスト技法ライブラリ by YamaY. All rights reserved.</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">参考文献：ISTQB Foundation Level Syllabus, IEEE 829, ISO/IEC/IEEE 29119</p>
      </footer>
    </div>
  );
};

export default CategoryView;
