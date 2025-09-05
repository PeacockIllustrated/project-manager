
import React from 'react';
import { Task, StaffMember } from '../../types';
import { getWeekDays, isSameDay, isToday, shortDayFormat } from '../../utils/dateUtils';
import { TaskWithProject } from '../pages/Schedule';
import ScheduleTask from './ScheduleTask';

interface TeamViewProps {
    currentDate: Date;
    tasks: TaskWithProject[];
    users: StaffMember[];
    onSelectTask: (task: Task) => void;
}

const TeamView: React.FC<TeamViewProps> = ({ currentDate, tasks, users, onSelectTask }) => {
    const days = getWeekDays(currentDate);

    return (
        <div className="h-full flex flex-col overflow-x-auto">
            {/* Header */}
            <div className="grid min-w-[900px]" style={{ gridTemplateColumns: '180px repeat(7, 1fr)' }}>
                <div className="p-2 border-b border-r border-brand-gray font-bold text-brand-charcoal">Team Member</div>
                {days.map(day => (
                    <div key={day.toISOString()} className="text-center p-2 border-b border-r border-brand-gray">
                        <p className="font-bold text-sm text-brand-text">{shortDayFormat.format(day)}</p>
                        <p className={`font-bold text-lg ${isToday(day) ? 'text-brand-teal' : 'text-brand-charcoal'}`}>{day.getDate()}</p>
                    </div>
                ))}
            </div>
            {/* Body */}
            <div className="flex-grow overflow-y-auto">
                 <div className="grid min-w-[900px]" style={{ gridTemplateColumns: '180px repeat(7, 1fr)' }}>
                    {users.flatMap(user => [
                         <div key={`${user.id}-name`} className="p-2 border-b border-r border-brand-gray flex items-center space-x-2">
                             <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full"/>
                             <span className="font-semibold text-sm text-brand-charcoal">{user.name}</span>
                         </div>,
                         ...days.map(day => {
                            const tasksForUserAndDay = tasks.filter(task => task.assigneeId === user.id && isSameDay(new Date(task.dueDate), day));
                            return (
                                <div key={`${user.id}-${day.toISOString()}`} className="p-1 border-b border-r border-brand-gray space-y-1 bg-brand-light-gray/20 min-h-[60px]">
                                    {tasksForUserAndDay.map(task => (
                                        <ScheduleTask key={task.id} task={task} onClick={() => onSelectTask(task)} compact />
                                    ))}
                                </div>
                            )
                        })
                    ])}
                </div>
            </div>
        </div>
    );
};

export default TeamView;