
import React from 'react';
import { Task, TaskStatus } from '../../types';
import { getMonthCalendarDays, isSameDay, isToday, shortDayFormat } from '../../utils/dateUtils';
import { TaskWithProject } from '../pages/Schedule';
import ScheduleTask from './ScheduleTask';

interface MonthViewProps {
    currentDate: Date;
    tasks: TaskWithProject[];
    onSelectTask: (task: Task) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ currentDate, tasks, onSelectTask }) => {
    const days = getMonthCalendarDays(currentDate);
    const dayHeaders = Array.from({ length: 7 }, (_, i) => shortDayFormat.format(new Date(2024, 0, i + 7)));
    
    return (
        <div className="overflow-x-auto h-full">
            <div className="grid grid-cols-7 min-w-[700px]">
                {dayHeaders.map(day => (
                    <div key={day} className="text-center font-bold text-sm text-brand-text py-2 border-b border-r border-brand-gray">
                        {day}
                    </div>
                ))}
                
                {days.map((day, index) => {
                    const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                    const tasksForDay = tasks.filter(task => isSameDay(new Date(task.dueDate), day));
                    
                    return (
                        <div 
                            key={index} 
                            className={`border-b border-r border-brand-gray p-2 flex flex-col h-28 ${!isCurrentMonth ? 'bg-brand-light-gray/50' : 'bg-white'}`}
                        >
                            <div className="flex justify-end">
                                <span className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${isToday(day) ? 'bg-brand-teal text-brand-charcoal' : 'text-brand-text'}`}>
                                    {day.getDate()}
                                </span>
                            </div>
                            <div className="flex-grow space-y-1 mt-1 overflow-y-auto">
                                {tasksForDay.slice(0, 3).map(task => (
                                    <ScheduleTask key={task.id} task={task} onClick={() => onSelectTask(task)} />
                                ))}
                                {tasksForDay.length > 3 && (
                                    <div className="text-xs text-brand-text font-semibold px-1">+ {tasksForDay.length - 3} more</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MonthView;