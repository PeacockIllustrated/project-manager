
import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import { Page } from './types';
import Tasks from './components/pages/Tasks';
import Schedule from './components/pages/Schedule';
import Documents from './components/pages/Documents';
import Financials from './components/pages/Financials';
import ClientPortal from './components/pages/ClientPortal';
import Settings from './components/pages/Settings';
import Staff from './components/pages/Staff';
import { useData } from './hooks/useData';
import LoadingSpinner from './components/ui/LoadingSpinner';


const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('Project Hub');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { loading } = useData();

  const renderContent = () => {
    switch (activePage) {
      case 'Project Hub':
        return <Dashboard setActivePage={setActivePage} />;
      case 'Tasks':
        return <Tasks />;
      case 'Schedule':
        return <Schedule />;
      case 'Staff':
        return <Staff />;
      case 'Documents':
        return <Documents />;
      case 'Financials':
        return <Financials />;
      case 'Client Portal':
        return <ClientPortal />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard setActivePage={setActivePage} />;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-screen bg-brand-light-gray font-sans text-brand-charcoal overflow-hidden">
       {/* Sidebar backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={activePage} onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-brand-light-gray p-4 sm:p-6 md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// FIX: Corrected a typo in the export statement from 'export a default' to 'export default'.
export default App;