
import React, { useState, useEffect } from 'react';
import { Project, ProjectStatus } from '../../types';
import { TrashIcon } from '../icons/Icons.tsx';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSave: (project: Omit<Project, 'id'> & { id?: string }) => void;
  onDelete: (projectId: string) => void;
}

type ProjectFormData = Omit<Project, 'id'>;

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    address: '',
    client: '',
    progress: 0,
    status: ProjectStatus.Quoting,
    quoteAmount: 0,
  });

  useEffect(() => {
    if (project) {
        const { id, ...projectData } = project;
        setFormData(projectData);
    } else {
        // Reset for new project
        setFormData({
            name: '',
            address: '',
            client: '',
            progress: 0,
            status: ProjectStatus.Quoting,
            quoteAmount: 0,
        });
    }
  }, [project]);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isNumberField = ['progress', 'quoteAmount'].includes(name);
    setFormData(prev => ({ 
        ...prev, 
        [name]: isNumberField ? parseFloat(value) || 0 : value 
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.client) {
        alert('Please fill in all required fields (Project Name and Client).');
        return;
    };
    onSave({ ...formData, id: project?.id });
  };

  const handleDelete = () => {
    if (project) {
      onDelete(project.id);
    }
  };

  const inputStyles = "w-full text-brand-charcoal bg-white border border-gray-300 rounded-lg px-3 py-2 transition-shadow focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal focus:outline-none";
  const labelStyles = "block text-sm font-semibold text-brand-charcoal mb-1";

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-11/12 max-w-lg md:max-w-2xl transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={e => e.stopPropagation()}
        style={{ animationFillMode: 'forwards' }}
      >
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b border-brand-gray">
            <h2 className="text-2xl font-bold text-brand-charcoal">{project ? 'Edit Project' : 'Add New Project'}</h2>
          </div>

          <div className="p-6 space-y-4 max-h-[70vh] md:max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="name" className={labelStyles}>Project Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className={inputStyles} />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className={labelStyles}>Address</label>
                <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className={inputStyles} />
              </div>
               <div>
                <label htmlFor="client" className={labelStyles}>Client</label>
                <input type="text" name="client" id="client" value={formData.client} onChange={handleChange} required className={inputStyles} />
              </div>
               <div>
                <label htmlFor="status" className={labelStyles}>Status</label>
                <select name="status" id="status" value={formData.status} onChange={handleChange} className={inputStyles}>
                  {Object.values(ProjectStatus).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="quoteAmount" className={labelStyles}>Quote Amount (£)</label>
                <input type="number" name="quoteAmount" id="quoteAmount" value={formData.quoteAmount} onChange={handleChange} min="0" step="0.01" className={inputStyles} />
              </div>
               <div className="md:col-span-2">
                <label htmlFor="progress" className={labelStyles}>Progress (%)</label>
                <input type="range" name="progress" id="progress" value={formData.progress} onChange={handleChange} min="0" max="100" className="w-full h-2 bg-brand-gray rounded-lg appearance-none cursor-pointer" />
                <div className="text-center font-semibold text-brand-text mt-1">{formData.progress}%</div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-brand-light-gray flex justify-between items-center rounded-b-xl">
             {project && (
                <button type="button" onClick={handleDelete} className="text-red-600 hover:text-red-800 font-semibold p-2 rounded-md hover:bg-red-100 transition-colors flex items-center">
                    <TrashIcon className="w-5 h-5 mr-1.5" /> Delete Project
                </button>
             )}
             <div className="flex-grow flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="px-5 py-2.5 bg-white border border-brand-gray text-brand-charcoal font-bold rounded-lg hover:bg-brand-gray transition">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-brand-teal text-brand-charcoal font-bold rounded-lg shadow-sm hover:bg-opacity-90 transition">{project ? 'Save Changes' : 'Create Project'}</button>
             </div>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;