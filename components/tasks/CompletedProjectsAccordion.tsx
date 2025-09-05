
import React, { useState, useRef, useEffect } from 'react';
import { ProjectWithTasks, Task } from '../../types';
import { ChevronRightIcon } from '../icons/Icons.tsx';
import CompletedProjectItem from './CompletedProjectItem';

interface CompletedProjectsAccordionProps {
    projects: ProjectWithTasks[];
    onSelectTask: (task: Task) => void;
}

const CompletedProjectsAccordion: React.FC<CompletedProjectsAccordionProps> = ({ projects, onSelectTask }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.setProperty('--accordion-content-height', `${contentRef.current.scrollHeight}px`);
        }
    }, [projects, isOpen]);


    return (
        <div className="border border-brand-gray rounded-xl bg-white/50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full p-4 font-bold text-brand-charcoal"
            >
                <h2>Completed Projects ({projects.length})</h2>
                <ChevronRightIcon className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
            </button>
            <div
                ref={contentRef}
                className={`overflow-hidden ${isOpen ? 'animate-accordion-down' : 'animate-accordion-up'}`}
                style={{ animationFillMode: 'forwards' }}
                onAnimationEnd={(e) => {
                     // Hide the content completely after the 'up' animation to prevent interaction
                    if (!isOpen && e.animationName === 'accordion-up' && contentRef.current) {
                         contentRef.current.classList.add('hidden');
                    }
                }}
                onAnimationStart={() => {
                    // Make sure content is not hidden before 'down' animation starts
                    if (isOpen && contentRef.current) {
                        contentRef.current.classList.remove('hidden');
                    }
                }}
            >
                <div className="px-4 pb-4 space-y-2">
                    {projects.map(project => (
                        <CompletedProjectItem 
                            key={project.id}
                            project={project}
                            onSelectTask={onSelectTask}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompletedProjectsAccordion;