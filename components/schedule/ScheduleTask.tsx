
import React from 'react';
import { TaskWithProject } from '../pages/Schedule';

interface ScheduleTaskProps {
    task: TaskWithProject;
    onClick: () => void;
    compact?: boolean;
}

const ScheduleTask: React.FC<ScheduleTaskProps> = ({ task, onClick, compact }) => {
    if (compact) {
        return (
             <div
                onClick={onClick}
                title={`${task.project.name}: ${task.title}`}
                className="p-1 rounded-md cursor-pointer hover:bg-white hover:shadow"
                style={{ backgroundColor: `${task.project.color}20` }} // 20 for ~12% opacity
            >
                <p className="text-xs font-semibold text-brand-charcoal truncate" style={{ color: task.project.color }}>{task.title}</p>
            </div>
        )
    }

    return (
        <div
            onClick={onClick}
            className="p-1.5 rounded-md cursor-pointer border-l-4 hover:bg-brand-gray transition-colors"
            style={{ borderColor: task.project.color, backgroundColor: `${task.project.color}1A` }} // 1A for 10% opacity
        >
            <p className="text-xs font-bold text-brand-charcoal truncate">{task.title}</p>
            <p className="text-xs text-brand-text truncate" style={{ color: task.project.color }}>{task.project.name}</p>
        </div>
    );
};

export default ScheduleTask;