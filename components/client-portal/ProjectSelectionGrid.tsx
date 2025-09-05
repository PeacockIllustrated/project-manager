
import React from 'react';
import { Project } from '../../types';
import ProjectSelectionCard from './ProjectSelectionCard';
import Placeholder from '../ui/Placeholder';
import { BriefcaseIcon } from '../icons/Icons.tsx';

interface ProjectSelectionGridProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
}

const ProjectSelectionGrid: React.FC<ProjectSelectionGridProps> = ({ projects, onSelectProject }) => {
  if (projects.length === 0) {
    return (
        <Placeholder
            icon={<BriefcaseIcon />}
            title="No Projects Available"
            message="There are currently no active or completed projects to display in the client portal."
        />
    );
  }
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectSelectionCard 
          key={project.id} 
          project={project} 
          onSelectProject={onSelectProject} 
        />
      ))}
    </div>
  );
};

export default ProjectSelectionGrid;
