const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Estate Planning Application
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Professional document generation system
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              <span className="font-medium">State:</span> California
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
