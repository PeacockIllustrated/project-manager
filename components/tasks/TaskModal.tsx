

import React, { useState, useEffect } from 'react';
import { Task, TaskStatus, TaskPriority } from '../../types';
import { TrashIcon } from '../icons/Icons.tsx';
import { useData } from '../../hooks/useData';

interface TaskModalProps {
  task: Task | null;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id'> & { id?: string }) => void;
  onDelete: (taskId: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onSave, onDelete }) => {
  const { projects, staffMembers } = useData();
  const [formData, setFormData] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    status: TaskStatus.ToDo,
    priority: TaskPriority.Medium,
    dueDate: new Date().toISOString().split('T')[0],
    assigneeId: staffMembers[0]?.id || '',
    projectId: projects[0]?.id || '',
  });

  useEffect(() => {
    if (task) {
      // Ensure dueDate is in YYYY-MM-DD format for the input[type=date]
      const formattedTask = { ...task, dueDate: task.dueDate.split('T')[0] };
      setFormData(formattedTask);
    } else {
      // Set defaults for new task based on available data
      setFormData(prev => ({
        ...prev,
        assigneeId: staffMembers[0]?.id || '',
        projectId: projects[0]?.id || '',
      }));
    }
  }, [task, staffMembers, projects]);

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
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.projectId || !formData.assigneeId) {
        alert('Please fill in all required fields.');
        return;
    };
    onSave({ ...(task || {}), ...formData });
  };

  const handleDelete = () => {
    if (task && window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
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
            <h2 className="text-2xl font-bold text-brand-charcoal">{task ? 'Edit Task' : 'Add New Task'}</h2>
          </div>

          <div className="p-6 space-y-4 max-h-[70vh] md:max-h-[60vh] overflow-y-auto">
            <div>
              <label htmlFor="title" className={labelStyles}>Title</label>
              <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className={inputStyles} />
            </div>
            <div>
              <label htmlFor="description" className={labelStyles}>Description</label>
              <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={4} className={inputStyles}></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="assigneeId" className={labelStyles}>Assign To</label>
                <select name="assigneeId" id="assigneeId" value={formData.assigneeId} onChange={handleChange} className={inputStyles}>
                  {staffMembers.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="projectId" className={labelStyles}>Project</label>
                <select name="projectId" id="projectId" value={formData.projectId} onChange={handleChange} className={inputStyles}>
                  {projects.map(proj => <option key={proj.id} value={proj.id}>{proj.name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="status" className={labelStyles}>Status</label>
                <select name="status" id="status" value={formData.status} onChange={handleChange} className={inputStyles}>
                  {Object.values(TaskStatus).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="priority" className={labelStyles}>Priority</label>
                <select name="priority" id="priority" value={formData.priority} onChange={handleChange} className={inputStyles}>
                   {Object.values(TaskPriority).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="dueDate" className={labelStyles}>Due Date</label>
                <input type="date" name="dueDate" id="dueDate" value={formData.dueDate} onChange={handleChange} required className={inputStyles} />
              </div>
            </div>
          </div>
          <div className="p-6 bg-brand-light-gray flex justify-between items-center rounded-b-xl">
             {task && (
                <button type="button" onClick={handleDelete} className="text-red-600 hover:text-red-800 font-semibold p-2 rounded-md hover:bg-red-100 transition-colors flex items-center">
                    <TrashIcon className="w-5 h-5 mr-1.5" /> Delete Task
                </button>
             )}
             <div className="flex-grow flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="px-5 py-2.5 bg-white border border-brand-gray text-brand-charcoal font-bold rounded-lg hover:bg-brand-gray transition">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-brand-teal text-brand-charcoal font-bold rounded-lg shadow-sm hover:bg-opacity-90 transition">{task ? 'Save Changes' : 'Create Task'}</button>
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

export default TaskModal;