
import React, { useState, useMemo } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useData } from '../../hooks/useData';
import { Task } from '../../types';
import TaskModal from '../tasks/TaskModal';
import { generateProjectColor } from '../../utils/colorUtils';
import ScheduleHeader from '../schedule/ScheduleHeader';
import MonthView from '../schedule/MonthView';
import WeekView from '../schedule/WeekView';
import TeamView from '../schedule/TeamView';

export type ScheduleView = 'month' | 'week' | 'team';

export interface TaskWithProject extends Task {
  project: {
    id: string;
    name: string;
    color: string;
  };
}

const Schedule: React.FC = () => {
  const { tasks, projects, staffMembers } = useData();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ScheduleView>('month');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const tasksWithProjectData = useMemo((): TaskWithProject[] => {
    return tasks.map(task => {
      const project = projects.find(p => p.id === task.projectId);
      return {
        ...task,
        project: {
          id: project?.id || 'unknown',
          name: project?.name || 'Unknown Project',
          color: generateProjectColor(task.projectId),
        }
      };
    });
  }, [tasks, projects]);
  
  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleSaveTask = async (taskToSave: Task) => {
    if (!taskToSave.id) return;
    try {
      const taskRef = doc(db, 'tasks', taskToSave.id);
      await updateDoc(taskRef, { ...taskToSave });
    } catch (error) {
      console.error("Error updating task from schedule: ", error);
      alert("There was an error saving the task.");
    } finally {
      handleCloseModal();
    }
  };
  
  const handleDeleteTask = async (taskId: string) => {
     try {
        const taskRef = doc(db, 'tasks', taskId);
        await deleteDoc(taskRef);
    } catch (error) {
        console.error("Error deleting task: ", error);
        alert("There was an error deleting the task.");
    } finally {
        handleCloseModal();
    }
  };

  const renderView = () => {
    switch(view) {
      case 'month':
        return <MonthView currentDate={currentDate} tasks={tasksWithProjectData} onSelectTask={handleSelectTask} />;
      case 'week':
        return <WeekView currentDate={currentDate} tasks={tasksWithProjectData} onSelectTask={handleSelectTask} />;
      case 'team':
        return <TeamView currentDate={currentDate} tasks={tasksWithProjectData} users={staffMembers} onSelectTask={handleSelectTask} />;
      default:
        return null;
    }
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-md border border-brand-gray/50 flex flex-col h-full">
        <ScheduleHeader 
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          view={view}
          setView={setView}
        />
        <div className="flex-grow p-1 md:p-4 overflow-auto">
          {renderView()}
        </div>
      </div>
      {isModalOpen && (
        <TaskModal 
          task={selectedTask} 
          onClose={handleCloseModal} 
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
        />
      )}
    </>
  );
};

export default Schedule;