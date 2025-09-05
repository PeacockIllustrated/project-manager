

import React from 'react';
import { useData } from '../../hooks/useData';
import AdminGuide from '../settings/AdminGuide';
import ChangeRequestForm from '../settings/ChangeRequestForm';
import { AlertTriangleIcon } from '../icons/Icons';

const Settings: React.FC = () => {
  const { resetData } = useData();

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This will delete any custom projects and restore the original sample data.')) {
      resetData();
    }
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-charcoal">Settings & Guide</h1>
        <p className="text-brand-text mt-1">Manage application preferences and learn how to use the dashboard.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-brand-gray/50 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-brand-charcoal">Application Data</h2>
          <div className="mt-4 border-t border-brand-gray pt-4 flex flex-col items-start space-y-4 md:flex-row md:space-y-0 md:justify-between md:items-center">
            <div>
              <h3 className="font-semibold text-brand-charcoal">Reset All Data</h3>
              <p className="text-sm text-brand-text max-w-md">
                This will permanently delete all current projects, tasks, and other data, and restore the application to its original sample state.
              </p>
            </div>
            <div className="flex-shrink-0">
               <button 
                  onClick={handleReset}
                  className="flex items-center bg-red-600 text-white font-bold px-4 py-2 rounded-lg shadow-sm hover:bg-red-700 transition-colors"
                >
                 <AlertTriangleIcon className="w-4 h-4 mr-2"/>
                 Reset All Data
               </button>
            </div>
          </div>
        </div>
      </div>
      
      <AdminGuide />

      <ChangeRequestForm />
    </div>
  );
};

export default Settings;