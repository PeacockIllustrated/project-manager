
import React, { useState } from 'react';
import { useData } from '../../hooks/useData';
import { ProjectStatus } from '../../types';
import ProjectSelectionGrid from '../client-portal/ProjectSelectionGrid';
import ClientProjectDetailView from '../client-portal/ClientProjectDetailView';
import { UsersIcon } from '../icons/Icons.tsx';

const ClientPortal: React.FC = () => {
    const { projects, tasks, documents } = useData();
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

    const clientVisibleProjects = projects.filter(
        p => p.status === ProjectStatus.Active || p.status === ProjectStatus.Completed || p.status === ProjectStatus.OnHold
    );

    const selectedProject = clientVisibleProjects.find(p => p.id === selectedProjectId);

    if (!selectedProject) {
        return (
            <div className="space-y-6">
                <div className="flex items-center space-x-3">
                    <div className="bg-brand-teal/20 p-2 rounded-lg">
                        <UsersIcon className="w-6 h-6 text-brand-teal" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-brand-charcoal">Client Portal</h1>
                        <p className="mt-1 text-brand-text">Select a project to view its details.</p>
                    </div>
                </div>
                <ProjectSelectionGrid projects={clientVisibleProjects} onSelectProject={setSelectedProjectId} />
            </div>
        );
    }

    const projectTasks = tasks.filter(t => t.projectId === selectedProjectId);
    const projectDocuments = documents.filter(d => d.projectId === selectedProjectId);

    return (
        <ClientProjectDetailView
            project={selectedProject}
            tasks={projectTasks}
            documents={projectDocuments}
            onBack={() => setSelectedProjectId(null)}
        />
    );
};

export default ClientPortal;