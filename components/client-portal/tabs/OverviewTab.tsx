
import React, { useMemo } from 'react';
import { Project, Task, TaskStatus } from '../../../types';
import ProgressBar from '../../ui/ProgressBar';
import { CheckCircleIcon } from '../../icons/Icons.tsx';

interface OverviewTabProps {
  project: Project;
  tasks: Task[];
}

const OverviewTab: React.FC<OverviewTabProps> = ({ project, tasks }) => {
    const recentUpdates = useMemo(() => {
        return tasks
            .filter(t => t.status === TaskStatus.Completed)
            .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())
            .slice(0, 5);
    }, [tasks]);

    const formatCurrency = (amount?: number) => {
        if (typeof amount !== 'number') return 'N/A';
        return amount.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-brand-charcoal mb-2">Project Progress</h2>
                    <div className="bg-brand-light-gray/60 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-medium text-brand-text">Overall Completion</p>
                            <span className="text-sm font-bold text-brand-charcoal">{project.progress}%</span>
                        </div>
                        <ProgressBar progress={project.progress} />
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-brand-charcoal mb-2">Recent Updates</h2>
                     <div className="bg-brand-light-gray/60 p-4 rounded-lg">
                        {recentUpdates.length > 0 ? (
                            <ul className="space-y-3">
                                {recentUpdates.map(task => (
                                    <li key={task.id} className="flex items-start space-x-3">
                                        <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-brand-charcoal">{task.title}</p>
                                            <p className="text-sm text-brand-text">
                                                Completed on {new Date(task.dueDate).toLocaleDateString(undefined, { timeZone: 'UTC' })}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-brand-text text-sm">No completed tasks to show as updates yet.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold text-brand-charcoal mb-2">Project Details</h2>
                <div className="bg-brand-light-gray/60 p-4 rounded-lg space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="font-semibold text-brand-text">Client:</span>
                        <span className="font-bold text-brand-charcoal">{project.client}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="font-semibold text-brand-text">Status:</span>
                        <span className="font-bold text-brand-charcoal">{project.status}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="font-semibold text-brand-text">Quote Amount:</span>
                        <span className="font-bold text-brand-charcoal">{formatCurrency(project.quoteAmount)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewTab;