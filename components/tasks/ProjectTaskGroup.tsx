import React, { useMemo } from 'react';
import { Task, TaskStatus, ProjectWithTasks } from '../../types';
import ProgressBar from '../ui/ProgressBar';
import TaskColumn from './TaskColumn';

interface ProjectTaskGroupProps {
  project: ProjectWithTasks;
  onSelectTask: (task: Task) => void;
}

const ProjectTaskGroup: React.FC<ProjectTaskGroupProps> = ({ project, onSelectTask }) => {
  const columns = useMemo(() => ({
    [TaskStatus.ToDo]: project.tasks.filter(t => t.status === TaskStatus.ToDo),
    [TaskStatus.InProgress]: project.tasks.filter(t => t.status === TaskStatus.InProgress),
    [TaskStatus.Completed]: project.tasks.filter(t => t.status === TaskStatus.Completed),
  }), [project.tasks]);

  return (
    <div className="bg-white rounded-xl shadow-md border border-brand-gray/50 p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-brand-charcoal truncate">{project.name}</h2>
        <div className="flex items-center mt-2">
            <ProgressBar progress={project.progress} />
            <span className="ml-4 text-sm font-bold text-brand-charcoal w-12 text-right">{project.progress}%</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TaskColumn title="To Do" tasks={columns[TaskStatus.ToDo]} onSelectTask={onSelectTask} />
        <TaskColumn title="In Progress" tasks={columns[TaskStatus.InProgress]} onSelectTask={onSelectTask} />
        <TaskColumn title="Completed" tasks={columns[TaskStatus.Completed]} onSelectTask={onSelectTask} />
      </div>
    </div>
  );
};

export default ProjectTaskGroup;