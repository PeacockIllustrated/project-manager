
import React from 'react';
import { DashboardIcon, TasksIcon, CalendarIcon, FolderIcon, DollarSignIcon, UsersIcon, SettingsIcon, ChevronDownIcon, BriefcaseIcon } from '../icons/Icons.tsx';
import { Page } from '../../types';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Logo: React.FC = () => (
  <div className="p-4 mb-4">
    <div className="flex items-center space-x-3">
       <div className="w-10 h-10 bg-brand-teal flex items-center justify-center rounded-lg">
          <svg className="w-6 h-6 text-brand-charcoal" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H10V10H4V4Z" opacity="0.8"/>
            <path d="M4 14H10V20H4V14Z"/>
            <path d="M14 4H20V10H14V4Z"/>
            <path d="M14 14H20V20H14V14Z" opacity="0.6"/>
          </svg>
        </div>
      <div>
        <h1 className="text-white text-xl font-bold tracking-tighter leading-tight">Your Brand</h1>
        <p className="text-brand-teal text-xs tracking-widest leading-tight">PROJECTS</p>
      </div>
    </div>
    <div className="h-px bg-brand-teal mt-4 opacity-50"></div>
  </div>
);

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick: () => void; }> = ({ icon, label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center w-full text-left px-4 py-2.5 rounded-lg transition-colors duration-200 ${
      active
        ? 'bg-brand-teal text-brand-charcoal shadow-md'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`}
  >
    {icon}
    <span className="ml-3 font-medium">{label}</span>
  </button>
);

const UserProfile: React.FC = () => (
  <div className="px-6 py-4 mt-auto border-t border-gray-700">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img className="h-10 w-10 rounded-full object-cover" src="https://picsum.photos/100" alt="User" />
        <div className="ml-3">
          <p className="text-sm font-semibold text-white">Lee Collins</p>
          <p className="text-xs text-gray-400">Project Manager</p>
        </div>
      </div>
      <button className="text-gray-400 hover:text-white">
        <ChevronDownIcon />
      </button>
    </div>
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isOpen, setIsOpen }) => {
  // FIX: Replaced JSX.Element with React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
  const navItems: { icon: React.ReactNode; label: Page }[] = [
    { icon: <DashboardIcon />, label: 'Project Hub' },
    { icon: <TasksIcon />, label: 'Tasks' },
    { icon: <CalendarIcon />, label: 'Schedule' },
    { icon: <BriefcaseIcon />, label: 'Staff' },
    { icon: <FolderIcon />, label: 'Documents' },
    { icon: <DollarSignIcon />, label: 'Financials' },
    { icon: <UsersIcon />, label: 'Client Portal' },
    { icon: <SettingsIcon />, label: 'Settings' },
  ];

  const handleNavClick = (page: Page) => {
    setActivePage(page);
    setIsOpen(false); // Close sidebar on nav item click on mobile
  };

  return (
    <div className={`w-64 bg-brand-charcoal text-white flex flex-col flex-shrink-0 fixed md:relative h-full z-30 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <Logo />
      <nav className="flex-1 space-y-2 px-4">
        {navItems.map(({ icon, label }) => (
          <NavItem 
            key={label}
            icon={icon} 
            label={label} 
            active={activePage === label} 
            onClick={() => handleNavClick(label)}
          />
        ))}
      </nav>
      <UserProfile />
    </div>
  );
};

export default Sidebar;