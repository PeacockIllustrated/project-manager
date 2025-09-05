
import React, { useState, useMemo } from 'react';
import { doc, addDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { Task, TaskStatus, ProjectStatus, ProjectWithTasks } from '../../types';
import { PlusIcon } from '../icons/Icons.tsx';
import TaskModal from '../tasks/TaskModal';
import ProjectTaskGroup from '../tasks/ProjectTaskGroup';
import CompletedProjectsAccordion from '../tasks/CompletedProjectsAccordion';
import { useData } from '../../hooks/useData';

const Tasks: React.FC = () => {
  const { tasks, projects } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const projectsWithTasks = useMemo((): ProjectWithTasks[] => {
    return projects.map(project => {
      const projectTasks = tasks.filter(task => task.projectId === project.id);
      const completedTasks = projectTasks.filter(task => task.status === TaskStatus.Completed).length;
      const progress = projectTasks.length > 0 ? Math.round((completedTasks / projectTasks.length) * 100) : project.progress;
      
      return {
        ...project,
        tasks: projectTasks,
        progress: progress,
      };
    });
  }, [tasks, projects]);
  
  const activeProjects = useMemo(() => {
    return projectsWithTasks.filter(p => p.status !== ProjectStatus.Completed);
  }, [projectsWithTasks]);

  const completedProjects = useMemo(() => {
    return projectsWithTasks.filter(p => p.status === ProjectStatus.Completed);
  }, [projectsWithTasks]);


  const handleOpenModal = (task: Task | null = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = async (taskToSave: Task) => {
    if (taskToSave.isSample) {
        alert("Sample tasks are read-only and cannot be edited.");
        handleCloseModal();
        return;
    }
    try {
        if (taskToSave.id) {
            // Editing existing task
            const taskRef = doc(db, 'tasks', taskToSave.id);
            await updateDoc(taskRef, { ...taskToSave });
        } else {
            // Creating new task
            const { id, ...newTaskData } = taskToSave;
            await addDoc(collection(db, 'tasks'), newTaskData);
        }
    } catch (error) {
        console.error("Error saving task: ", error);
        alert("There was an error saving the task. Please try again.");
    } finally {
        handleCloseModal();
    }
  };
  
  const handleDeleteTask = async (taskId: string) => {
    const taskToDelete = tasks.find(t => t.id === taskId);
    if (taskToDelete?.isSample) {
        alert("Sample tasks are read-only and cannot be deleted.");
        handleCloseModal();
        return;
    }
    try {
        const taskRef = doc(db, 'tasks', taskId);
        await deleteDoc(taskRef);
    } catch (error) {
        console.error("Error deleting task: ", error);
        alert("There was an error deleting the task. Please try again.");
    } finally {
        handleCloseModal();
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-charcoal">Task Board</h1>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center bg-brand-teal text-brand-charcoal font-bold px-4 py-2.5 sm:px-5 rounded-lg shadow-sm hover:bg-opacity-90 transition-transform transform hover:scale-105"
            disabled={projects.length === 0}
            title={projects.length === 0 ? "Create a project before adding tasks" : "Add Task"}
          >
            <PlusIcon className="w-5 h-5 sm:mr-2" />
            <span className="hidden sm:inline">Add Task</span>
          </button>
        </div>
        
        <div className="flex-grow space-y-8 overflow-y-auto">
            {activeProjects.map(project => (
                <ProjectTaskGroup key={project.id} project={project} onSelectTask={handleOpenModal} />
            ))}
            
            {completedProjects.length > 0 && (
                <CompletedProjectsAccordion projects={completedProjects} onSelectTask={handleOpenModal} />
            )}
        </div>

      </div>
      {isModalOpen && (
        <TaskModal 
          task={editingTask} 
          onClose={handleCloseModal} 
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
        />
      )}
    </>
  );
};

export default Tasks;