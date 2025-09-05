
import React, { useState } from 'react';
import { Project, Task, Document as DocType } from '../../types';
import { ChevronLeftIcon, DashboardIcon, CalendarIcon, FolderIcon } from '../icons/Icons.tsx';
import OverviewTab from './tabs/OverviewTab';
import ScheduleTab from './tabs/ScheduleTab';
import DocumentsTab from './tabs/DocumentsTab';

type ClientViewTab = 'overview' | 'schedule' | 'documents';

interface ClientProjectDetailViewProps {
  project: Project;
  tasks: Task[];
  documents: DocType[];
  onBack: () => void;
}

const ClientProjectDetailView: React.FC<ClientProjectDetailViewProps> = ({ project, tasks, documents, onBack }) => {
    const [activeTab, setActiveTab] = useState<ClientViewTab>('overview');

    const TabButton: React.FC<{
        tabName: ClientViewTab;
        icon: React.ReactNode;
        label: string;
    }> = ({ tabName, icon, label }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeTab === tabName
                    ? 'bg-brand-teal text-brand-charcoal'
                    : 'text-brand-text hover:bg-brand-gray'
            }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab project={project} tasks={tasks} />;
            case 'schedule':
                return <ScheduleTab tasks={tasks} />;
            case 'documents':
                return <DocumentsTab documents={documents} />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <button onClick={onBack} className="flex items-center text-sm font-semibold text-brand-text hover:text-brand-charcoal mb-4">
                    <ChevronLeftIcon className="w-5 h-5 mr-1" />
                    Back to All Projects
                </button>
                <h1 className="text-3xl font-bold text-brand-charcoal">{project.name}</h1>
                <p className="mt-1 text-brand-text">{project.address}</p>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-brand-gray/50">
                <div className="p-3 border-b border-brand-gray flex items-center space-x-2">
                    <TabButton tabName="overview" label="Overview" icon={<DashboardIcon className="w-5 h-5" />} />
                    <TabButton tabName="schedule" label="Schedule" icon={<CalendarIcon className="w-5 h-5" />} />
                    <TabButton tabName="documents" label="Documents" icon={<FolderIcon className="w-5 h-5" />} />
                </div>
                <div className="p-4 md:p-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default ClientProjectDetailView;