
import React from 'react';
import { useData } from '../../hooks/useData';
import ToggleSwitch from '../ui/ToggleSwitch';
import AdminGuide from '../settings/AdminGuide';
import ChangeRequestForm from '../settings/ChangeRequestForm';

const Settings: React.FC = () => {
  const { showSampleData, toggleShowSampleData } = useData();
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-charcoal">Settings & Guide</h1>
        <p className="text-brand-text mt-1">Manage application preferences and learn how to use the dashboard.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-brand-gray/50 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-brand-charcoal">General</h2>
          <div className="mt-4 border-t border-brand-gray pt-4 flex flex-col items-start space-y-4 md:flex-row md:space-y-0 md:justify-between md:items-center">
            <div>
              <h3 className="font-semibold text-brand-charcoal">Display Sample Data</h3>
              <p className="text-sm text-brand-text max-w-md">
                Show or hide sample projects, tasks, and financials for demonstration purposes.
              </p>
            </div>
            <div className="flex-shrink-0">
               <ToggleSwitch isEnabled={showSampleData} onToggle={toggleShowSampleData} />
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