
import React from 'react';
import { Task } from '../../types';
import TaskCard from './TaskCard';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onSelectTask: (task: Task) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, onSelectTask }) => {
  return (
    <div className="bg-brand-gray/50 rounded-xl p-4 flex flex-col">
      <h2 className="text-lg font-bold text-brand-charcoal px-2 pb-2 mb-4 border-b-2 border-brand-gray">
        {title} <span className="text-sm font-medium text-brand-text">({tasks.length})</span>
      </h2>
      <div className="space-y-4 overflow-y-auto flex-grow">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onClick={() => onSelectTask(task)} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;