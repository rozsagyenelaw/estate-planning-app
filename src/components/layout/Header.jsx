import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

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
          <div className="flex items-center space-x-6">
            <nav className="flex items-center space-x-4">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive('/')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                New Client
              </Link>
              <Link
                to="/clients"
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive('/clients') || location.pathname.startsWith('/client/')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                View Clients
              </Link>
            </nav>
            <div className="text-sm text-gray-500 border-l pl-6">
              <span className="font-medium">State:</span> California
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
