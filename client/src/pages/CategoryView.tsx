import { useContext, useEffect } from "react";
import { Link, useParams } from "wouter";
import { AppContext } from "../context/AppContext";
import { techniques } from "../data/techniques";
import { categories } from "../data/categories";
import { filterTechniques } from "../hooks/useSearch";

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
          <a className="mt-6 inline-block text-primary-600 hover:text-primary-800">
            ホームに戻る
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentCategory.name}</h2>
        <p className="text-gray-600">{currentCategory.description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredTechniques.map((technique) => (
          <Link key={technique.id} href={`/technique/${technique.id}`}>
            <a className="technique-item bg-white shadow rounded-lg cursor-pointer hover:shadow-md transition duration-150 border border-gray-200">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">{technique.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    technique.category === 'blackbox' ? 'bg-primary-100 text-primary-800' : 
                    technique.category === 'whitebox' ? 'bg-accent-100 text-accent-800' :
                    technique.category === 'experience' ? 'bg-amber-100 text-amber-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {technique.categoryName}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">{technique.shortDescription}</p>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-gray-500 mr-4">
                    <i className="fas fa-chart-bar mr-1"></i> 効果: {technique.effectiveness}
                  </span>
                  <span className="text-gray-500">
                    <i className="fas fa-bolt mr-1"></i> 複雑度: {technique.complexity}
                  </span>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} ソフトウェアテスト技法ライブラリ. All rights reserved.</p>
        <p className="mt-1">参考文献：ISTQB Foundation Level Syllabus, IEEE 829, ISO/IEC/IEEE 29119</p>
      </footer>
    </div>
  );
};

export default CategoryView;
