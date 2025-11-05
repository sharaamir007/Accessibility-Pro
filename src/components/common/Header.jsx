import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">A11Y</span>
            </div>
            <h1 className="text-2xl font-bold">Accessibility Pro</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#speech" className="hover:text-blue-200 transition-colors">Speech</a>
            <a href="#vision" className="hover:text-blue-200 transition-colors">Vision</a>
            <a href="#settings" className="hover:text-blue-200 transition-colors">Settings</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;