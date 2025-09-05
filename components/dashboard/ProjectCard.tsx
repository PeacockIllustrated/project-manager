
import React, { useState, useRef, useEffect } from 'react';
import { Project, Page } from '../../types';
import ProgressBar from '../ui/ProgressBar';
import { MoreHorizontalIcon, TasksIcon, CalendarIcon, FolderIcon, EditIcon, TrashIcon } from '../icons/Icons.tsx';

interface ProjectCardProps {
  project: Project;
  setActivePage: (page: Page) => void;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, setActivePage, onEdit, onDelete }) => {
  const { name, address, client, progress, status } = project;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const handleMenuClick = (page: Page) => {
    setActivePage(page);
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-brand-gray/50 flex flex-col">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start">
            <span className="text-xs font-semibold bg-brand-teal/20 text-brand-teal px-2 py-1 rounded-full">{status}</span>
            <div className="relative" ref={menuRef}>
                <button 
                    className="text-gray-400 hover:text-brand-charcoal p-1 -m-1"
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    aria-label="Project options"
                >
                    <MoreHorizontalIcon />
                </button>
                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border border-brand-gray animate-fade-in-scale-sm" style={{animationFillMode: 'forwards'}}>
                        <div className="p-1">
                            <button onClick={() => onEdit(project)} className="w-full text-left px-3 py-2 text-sm text-brand-charcoal hover:bg-brand-gray rounded-md flex items-center transition-colors">
                                <EditIcon className="w-4 h-4 mr-3 text-brand-text"/> Edit Project
                            </button>
                             <div className="my-1 h-px bg-brand-gray"></div>
                            <button onClick={() => handleMenuClick('Tasks')} className="w-full text-left px-3 py-2 text-sm text-brand-charcoal hover:bg-brand-gray rounded-md flex items-center transition-colors">
                                <TasksIcon className="w-4 h-4 mr-3 text-brand-text"/> View Tasks
                            </button>
                            <button onClick={() => handleMenuClick('Schedule')} className="w-full text-left px-3 py-2 text-sm text-brand-charcoal hover:bg-brand-gray rounded-md flex items-center transition-colors">
                                <CalendarIcon className="w-4 h-4 mr-3 text-brand-text"/> View Schedule
                            </button>
                            <button onClick={() => handleMenuClick('Documents')} className="w-full text-left px-3 py-2 text-sm text-brand-charcoal hover:bg-brand-gray rounded-md flex items-center transition-colors">
                                <FolderIcon className="w-4 h-4 mr-3 text-brand-text"/> View Documents
                            </button>
                             <div className="my-1 h-px bg-brand-gray"></div>
                             <button onClick={() => onDelete(project.id)} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center transition-colors">
                                <TrashIcon className="w-4 h-4 mr-3"/> Delete Project
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
        <h3 className="text-lg font-bold text-brand-charcoal mt-3 truncate">{name}</h3>
        <p className="text-sm text-brand-text mt-1">{address}</p>
        <p className="text-sm text-brand-text font-medium mt-3">Client: <span className="font-semibold text-brand-charcoal">{client}</span></p>
      </div>

      <div className="p-5 bg-brand-light-gray/50 border-t border-brand-gray">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-brand-text">Progress</p>
          <span className="text-sm font-bold text-brand-charcoal">{progress}%</span>
        </div>
        <ProgressBar progress={progress} />
      </div>
      <style>{`
        @keyframes fade-in-scale-sm {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale-sm {
          animation: fade-in-scale-sm 0.1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;