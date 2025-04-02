import { useContext, useState } from "react";
import { Search } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { useLocation } from "wouter";

const SearchBar = () => {
  const { setSearchQuery } = useContext(AppContext);
  const [query, setQuery] = useState("");
  const [, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchQuery(query);
      setLocation("/");
    }
  };

  return (
    <div className="relative" data-focused={false}>
      <form onSubmit={handleSearch}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-primary/70" />
        </div>
        <input 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm hover:shadow-md transition-shadow sm:text-sm"
          placeholder="テスト技法を検索"
          type="search"
        />
        {query && (
          <button 
            type="submit"
            className="absolute inset-y-0 right-0 pr-3 flex items-center button-gradient text-white rounded-r-md px-4 text-sm"
          >
            検索
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
