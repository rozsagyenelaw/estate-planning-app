import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      await logout();
    }
  };

  // Don't show header on login page
  if (location.pathname === '/login') {
    return null;
  }

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
            {isAuthenticated && (
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
                <Link
                  to="/external-trust-amendment"
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActive('/external-trust-amendment')
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Amendment (External Trust)
                </Link>
              </nav>
            )}
            <div className="flex items-center space-x-4 border-l pl-6">
              <div className="text-sm text-gray-500">
                <span className="font-medium">State:</span> California
              </div>
              {isAuthenticated && user && (
                <>
                  <div className="text-sm text-gray-600">
                    {user.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
