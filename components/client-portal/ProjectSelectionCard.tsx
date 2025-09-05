
import React from 'react';
import { Project } from '../../types';
import { ChevronRightIcon, BuildingIcon } from '../icons/Icons.tsx';
import ProgressBar from '../ui/ProgressBar';

interface ProjectSelectionCardProps {
  project: Project;
  onSelectProject: (projectId: string) => void;
}

const ProjectSelectionCard: React.FC<ProjectSelectionCardProps> = ({ project, onSelectProject }) => {
  const { name, address, status, progress } = project;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-brand-gray/50 flex flex-col">
      <div className="p-5 flex-grow">
        <div className="flex items-start space-x-4">
            <div className="bg-brand-light-gray p-3 rounded-lg mt-1">
                <BuildingIcon className="w-6 h-6 text-brand-teal" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-brand-charcoal">{name}</h3>
                <p className="text-sm text-brand-text mt-1">{address}</p>
                <span className="mt-2 inline-block text-xs font-semibold bg-brand-teal/20 text-brand-teal px-2 py-1 rounded-full">{status}</span>
            </div>
        </div>
        <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-brand-text">Progress</p>
                <span className="text-sm font-bold text-brand-charcoal">{progress}%</span>
            </div>
            <ProgressBar progress={progress} />
        </div>
      </div>
      <button 
        onClick={() => onSelectProject(project.id)}
        className="p-4 bg-brand-light-gray/60 border-t border-brand-gray hover:bg-brand-gray transition-colors text-brand-teal font-bold flex justify-between items-center w-full"
      >
        <span>View Project</span>
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProjectSelectionCard;