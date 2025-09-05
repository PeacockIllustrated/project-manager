
import React, { useMemo } from 'react';
import { Task, TaskStatus } from '../../../types';
import ClientPortalTaskItem from '../ClientPortalTaskItem';

interface ScheduleTabProps {
  tasks: Task[];
}

const TaskGroup: React.FC<{title: string, tasks: Task[]}> = ({ title, tasks }) => (
    <div>
        <h3 className="text-lg font-bold text-brand-charcoal mb-3 pb-2 border-b border-brand-gray">{title}</h3>
        {tasks.length > 0 ? (
            <div className="space-y-2">
                {tasks.map(task => <ClientPortalTaskItem key={task.id} task={task} />)}
            </div>
        ) : (
            <p className="text-sm text-brand-text italic">No tasks in this category.</p>
        )}
    </div>
);


const ScheduleTab: React.FC<ScheduleTabProps> = ({ tasks }) => {
    const groupedTasks = useMemo(() => {
        const now = new Date();
        const inProgress = tasks.filter(t => t.status === TaskStatus.InProgress);
        const upcoming = tasks.filter(t => t.status === TaskStatus.ToDo && new Date(t.dueDate) >= now)
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        const completed = tasks.filter(t => t.status === TaskStatus.Completed)
            .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
        
        return { inProgress, upcoming, completed };
    }, [tasks]);

    return (
        <div className="space-y-8">
            <TaskGroup title="In Progress" tasks={groupedTasks.inProgress} />
            <TaskGroup title="Upcoming Tasks" tasks={groupedTasks.upcoming} />
            <TaskGroup title="Completed Tasks" tasks={groupedTasks.completed} />
        </div>
    );
};

export default ScheduleTab;