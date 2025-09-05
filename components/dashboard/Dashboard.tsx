

import React, { useState, useMemo } from 'react';
import { doc, addDoc, updateDoc, collection, writeBatch, query, where, getDocs } from 'firebase/firestore';
// FIX: Changed import path from 'firebase/storage' to '@firebase/storage' to resolve module export errors, which can occur with certain project dependency setups.
import { ref, deleteObject } from '@firebase/storage';
import { db, storage } from '../../firebase';
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
  const { projects } = useData();
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
            handleCloseProjectModal();
            return;
        }
        // Editing existing project
        const projectRef = doc(db, 'projects', projectToSave.id);
        const { id, ...projectData } = projectToSave;
        await updateDoc(projectRef, projectData);
      } else {
        // Creating new project, ensuring progress is initialized to 0.
        const { id, ...newProjectData } = projectToSave;
        await addDoc(collection(db, 'projects'), { ...newProjectData, progress: newProjectData.progress || 0 });
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
        const batch = writeBatch(db);

        // 1. Delete the project
        const projectRef = doc(db, 'projects', projectId);
        batch.delete(projectRef);

        // 2. Find and delete all associated tasks
        const tasksQuery = query(collection(db, 'tasks'), where('projectId', '==', projectId));
        const tasksSnapshot = await getDocs(tasksQuery);
        tasksSnapshot.forEach(taskDoc => {
            batch.delete(taskDoc.ref);
        });

        // 3. Find all associated documents
        const docsQuery = query(collection(db, 'documents'), where('projectId', '==', projectId));
        const docsSnapshot = await getDocs(docsQuery);
        
        // 4. Delete documents from Firebase Storage
        const storageDeletePromises: Promise<void>[] = [];
        docsSnapshot.forEach(docSnap => {
            const docData = docSnap.data();
            if(docData.storagePath) {
                const fileRef = ref(storage, docData.storagePath);
                storageDeletePromises.push(deleteObject(fileRef));
            }
            // 5. Add document deletion from Firestore to the batch
            batch.delete(docSnap.ref);
        });

        // Wait for all files to be deleted from storage before committing the db changes
        await Promise.all(storageDeletePromises);
        
        // 6. Commit all database deletions
        await batch.commit();

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