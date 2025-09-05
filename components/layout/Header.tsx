
import React from 'react';
import { SearchIcon, BellIcon, MenuIcon } from '../icons/Icons.tsx';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuClick }) => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center flex-shrink-0 border-b border-brand-gray">
      <div className="flex items-center">
        <button type="button" aria-label="Open menu" className="text-brand-charcoal mr-3 md:hidden" onClick={onMenuClick}>
          <MenuIcon />
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-brand-charcoal">{title}</h2>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="relative hidden sm:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-40 md:w-64 pl-10 pr-4 py-2 border border-brand-gray rounded-lg focus:ring-brand-teal focus:border-brand-teal transition"
          />
        </div>
        <button type="button" aria-label="Notifications" className="p-2 rounded-full hover:bg-brand-gray transition">
          <BellIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;