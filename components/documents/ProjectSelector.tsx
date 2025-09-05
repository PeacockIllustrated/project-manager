
import React from 'react';
import { Project } from '../../types';
import { FolderIcon } from '../icons/Icons.tsx';

interface ProjectSelectorProps {
  projects: Project[];
  selectedProjectId: string | null;
  onSelectProject: (projectId: string) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ projects, selectedProjectId, onSelectProject }) => {
  if (projects.length === 0) {
    return (
        <div className="p-4 text-center text-brand-text">
            <p>No projects available. Create a project in the 'Project Hub' to add documents.</p>
        </div>
    );
  }
    
  return (
    <nav className="p-2 space-y-1">
      {projects.map(project => (
        <button
          key={project.id}
          onClick={() => onSelectProject(project.id)}
          className={`w-full flex items-center text-left px-3 py-2.5 rounded-lg transition-colors duration-200 ${
            selectedProjectId === project.id
              ? 'bg-brand-teal/20 text-brand-charcoal font-semibold'
              : 'text-brand-charcoal hover:bg-brand-gray'
          }`}
        >
          <FolderIcon className={`w-5 h-5 mr-3 ${selectedProjectId === project.id ? 'text-brand-teal' : 'text-brand-text'}`} />
          <span className="truncate">{project.name}</span>
        </button>
      ))}
    </nav>
  );
};

export default ProjectSelector;