import { Link } from "wouter";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md mx-auto text-center p-8 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-4">
            <AlertCircle className="h-10 w-10 text-red-500 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-bold gradient-heading mb-2">ページが見つかりません</h1>
        </div>
        
        <p className="mt-4 text-gray-600 dark:text-gray-300 mb-6">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        
        <Link href="/">
          <a className="mt-6 inline-flex items-center px-5 py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-medium rounded-md hover:opacity-90 transition-opacity">
            <Home className="h-5 w-5 mr-2" />
            ホームに戻る
          </a>
        </Link>
      </div>
    </div>
  );
}
