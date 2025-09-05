
import React from 'react';
import { Task, TaskPriority } from '../../types';
import { FlagIcon } from '../icons/Icons.tsx';
import { useData } from '../../hooks/useData';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const { staffMembers } = useData();
  const assignee = staffMembers.find(u => u.id === task.assigneeId);

  const priorityStyles: Record<TaskPriority, { bg: string; text: string; icon: string }> = {
    [TaskPriority.Low]: { bg: 'bg-blue-100', text: 'text-blue-800', icon: 'text-blue-500' },
    [TaskPriority.Medium]: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: 'text-yellow-500' },
    [TaskPriority.High]: { bg: 'bg-red-100', text: 'text-red-800', icon: 'text-red-500' },
  };
  
  const styles = priorityStyles[task.priority];

  return (
    <div 
        onClick={onClick}
        className="bg-white p-4 rounded-lg shadow-sm border border-brand-gray/60 hover:shadow-md hover:border-brand-teal/50 cursor-pointer transition-all duration-200"
    >
      <h4 className="font-bold text-brand-charcoal truncate mb-3">{task.title}</h4>
      
      <div className="flex justify-between items-center pt-3 border-t border-brand-gray">
        <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-semibold ${styles.bg} ${styles.text}`}>
                <FlagIcon className={`w-3 h-3 ${styles.icon}`} />
                <span>{task.priority}</span>
            </div>
            {assignee && (
                <img src={assignee.avatarUrl} alt={assignee.name} className="w-6 h-6 rounded-full ring-2 ring-white" title={assignee.name} />
            )}
        </div>
        <span className="text-xs font-medium text-brand-text">
            Due: {new Date(task.dueDate).toLocaleDateString(undefined, { timeZone: 'UTC' })}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;