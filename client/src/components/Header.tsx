import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold gradient-heading truncate max-w-[180px] sm:max-w-md md:max-w-lg">
              ソフトウェアテスト技法ライブラリ by YamaY
            </h1>
          </div>
          <div className="flex items-center">
            <div className="hidden sm:block">
              <SearchBar />
            </div>
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
