
import React, { useState } from 'react';
import { ProjectWithTasks, Task, TaskStatus } from '../../types';
import { ChevronRightIcon } from '../icons/Icons.tsx';

interface CompletedProjectItemProps {
    project: ProjectWithTasks;
    onSelectTask: (task: Task) => void;
}

const CompletedProjectItem: React.FC<CompletedProjectItemProps> = ({ project, onSelectTask }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-brand-light-gray/80 rounded-lg border border-brand-gray">
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full p-3 text-left"
            >
                <span className="font-semibold text-brand-charcoal">{project.name}</span>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-brand-text">{project.tasks.length} tasks</span>
                    <ChevronRightIcon className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                </div>
            </button>
            {isExpanded && (
                <div className="p-3 border-t border-brand-gray">
                    <ul className="space-y-1">
                        {project.tasks.map(task => (
                            <li key={task.id}>
                                <button 
                                    onClick={() => onSelectTask(task)}
                                    className="w-full text-left text-sm text-brand-text hover:text-brand-charcoal p-1 rounded hover:bg-brand-gray transition-colors"
                                >
                                    <span className={`mr-2 font-bold ${task.status === TaskStatus.Completed ? 'text-green-500' : 'text-yellow-500'}`}>
                                        &#10003;
                                    </span>
                                    {task.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CompletedProjectItem;