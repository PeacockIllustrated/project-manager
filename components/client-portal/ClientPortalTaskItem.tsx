
import React from 'react';
import { Task, TaskStatus } from '../../types';
import { useData } from '../../hooks/useData';
import { CheckCircleIcon, ClockIcon } from '../icons/Icons.tsx';

interface ClientPortalTaskItemProps {
    task: Task;
}

const ClientPortalTaskItem: React.FC<ClientPortalTaskItemProps> = ({ task }) => {
    const { staffMembers } = useData();
    const assignee = staffMembers.find(s => s.id === task.assigneeId);

    const getStatusIcon = () => {
        switch (task.status) {
            case TaskStatus.Completed:
                return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
            case TaskStatus.InProgress:
                 return <div className="w-5 h-5 flex items-center justify-center"><div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div></div>;
            case TaskStatus.ToDo:
                return <ClockIcon className="w-5 h-5 text-blue-500" />;
            default:
                return null;
        }
    };
    
    return (
        <div className="flex items-start space-x-4 p-3 bg-brand-light-gray/60 rounded-lg">
            <div className="mt-1">{getStatusIcon()}</div>
            <div className="flex-grow">
                <p className="font-semibold text-brand-charcoal">{task.title}</p>
                 {task.description && <p className="text-sm text-brand-text mt-1">{task.description}</p>}
                <div className="flex items-center space-x-4 mt-2 text-xs text-brand-text">
                    <span>Due: {new Date(task.dueDate).toLocaleDateString(undefined, { timeZone: 'UTC' })}</span>
                    {assignee && <span>Assigned to: {assignee.name.split(' ')[0]}</span>}
                </div>
            </div>
        </div>
    );
};

export default ClientPortalTaskItem;