const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <p className="text-sm">
            © {currentYear} Estate Planning Application. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Professional legal document generation system
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
