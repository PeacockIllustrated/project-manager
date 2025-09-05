

import React, { useState, useMemo } from 'react';
import { ProjectStatus, Page, Project } from '../../types';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { PlusIcon, DashboardIcon } from '../icons/Icons.tsx';
import { useData } from '../../hooks/useData';
import Placeholder from '../ui/Placeholder';

interface DashboardProps {
  setActivePage: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActivePage }) => {
  const [activeFilter, setActiveFilter] = useState<ProjectStatus | 'All'>('All');
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const filters: (ProjectStatus | 'All')[] = ['All', ...Object.values(ProjectStatus)];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }
    return projects.filter(p => p.status === activeFilter);
  }, [activeFilter, projects]);

  const handleOpenProjectModal = (project: Project | null = null) => {
    setEditingProject(project);
    setIsProjectModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setIsProjectModalOpen(false);
    setEditingProject(null);
  };

  const handleSaveProject = async (projectToSave: Omit<Project, 'id'> & { id?: string }) => {
    try {
      if (projectToSave.id) {
        const originalProject = projects.find(p => p.id === projectToSave.id);
        if (originalProject?.isSample) {
            alert("Sample projects are read-only and cannot be edited.");
            return;
        }
        updateProject(projectToSave as Project);
      } else {
        addProject({ ...projectToSave, progress: projectToSave.progress || 0 });
      }
    } catch (error) {
      console.error("Error saving project: ", error);
      alert("There was an error saving the project. Please try again.");
    } finally {
      handleCloseProjectModal();
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    const projectToDelete = projects.find(p => p.id === projectId);
    if (projectToDelete?.isSample) {
        alert("Sample projects are read-only and cannot be deleted.");
        return;
    }

    if (!window.confirm('Are you sure you want to delete this project and all its tasks and documents? This action cannot be undone.')) {
        return;
    }
    
    try {
        deleteProject(projectId);
    } catch (error) {
        console.error("Error deleting project and its assets: ", error);
        alert("There was an error deleting the project. Please try again.");
    } finally {
        handleCloseProjectModal();
    }
  };


  const FilterButton: React.FC<{ filter: ProjectStatus | 'All' }> = ({ filter }) => {
    const isActive = activeFilter === filter;
    return (
      <button
        onClick={() => setActiveFilter(filter)}
        className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
          isActive
            ? 'bg-brand-charcoal text-white shadow-md'
            : 'bg-white text-brand-text hover:bg-brand-gray'
        }`}
      >
        {filter}
      </button>
    );
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2 bg-white p-1 rounded-full border border-brand-gray">
              {filters.map(f => <FilterButton key={f} filter={f} />)}
          </div>
          <button 
            onClick={() => handleOpenProjectModal()}
            className="flex items-center justify-center bg-brand-teal text-brand-charcoal font-bold px-4 py-2.5 sm:px-5 rounded-lg shadow-sm hover:bg-opacity-90 transition-transform transform hover:scale-105"
          >
              <PlusIcon className="w-5 h-5 sm:mr-2" />
              <span className="hidden sm:inline">New Project</span>
          </button>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProjects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                setActivePage={setActivePage}
                onEdit={handleOpenProjectModal}
                onDelete={handleDeleteProject}
              />
              ))}
          </div>
        ) : (
          <div className="mt-10">
              <Placeholder 
                  icon={<DashboardIcon />}
                  title="No Projects Found"
                  message={`There are no projects with the status "${activeFilter}". Try a different filter or create a new project to get started.`}
              />
          </div>
        )}
      </div>
      {isProjectModalOpen && (
        <ProjectModal
          project={editingProject}
          onClose={handleCloseProjectModal}
          onSave={handleSaveProject}
          onDelete={handleDeleteProject}
        />
      )}
    </>
  );
};

export default Dashboard;