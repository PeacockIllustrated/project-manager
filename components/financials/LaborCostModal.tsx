

import React, { useState, useEffect, useMemo } from 'react';
import { Project, CostItem } from '../../types';
import { useData } from '../../hooks/useData';

interface CostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (costData: Omit<CostItem, 'projectId' | 'id'> & { id?: string }) => void;
  project: Project;
  costToEdit?: CostItem | null;
}

const CostModal: React.FC<CostModalProps> = ({ isOpen, onClose, onSave, project, costToEdit }) => {
  const { documents } = useData();
  
  const getInitialFormData = () => ({
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    type: 'material' as 'material' | 'labor',
    documentId: '',
  });

  const [formData, setFormData] = useState(getInitialFormData());

  const projectDocuments = useMemo(() => {
    return documents.filter(doc => doc.projectId === project.id);
  }, [documents, project.id]);
  
  useEffect(() => {
    if (isOpen) {
        if (costToEdit) {
            setFormData({
                description: costToEdit.description,
                amount: costToEdit.amount,
                date: costToEdit.date.split('T')[0],
                type: costToEdit.type,
                documentId: costToEdit.documentId || '',
            });
        } else {
            setFormData(getInitialFormData());
        }
    }
  }, [isOpen, costToEdit, project.id]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isNumeric = type === 'number';
    setFormData(prev => ({ 
        ...prev, 
        [name]: isNumeric ? parseFloat(value) || 0 : value 
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || formData.amount <= 0) {
        alert("Please provide a description and a valid amount.");
        return;
    }

    const { documentId, ...rest } = formData;
    
    const dataToSave = {
        ...rest,
        id: costToEdit?.id,
        date: new Date(formData.date).toISOString(),
        ...(documentId && { documentId }),
    };

    onSave(dataToSave);
  };

  if (!isOpen) return null;

  const inputStyles = "w-full text-brand-charcoal bg-white border border-gray-300 rounded-lg px-3 py-2 transition-shadow focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal focus:outline-none";
  const labelStyles = "block text-sm font-semibold text-brand-charcoal mb-1";
  const isEditing = !!costToEdit;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-11/12 max-w-lg transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={e => e.stopPropagation()}
        style={{ animationFillMode: 'forwards' }}
      >
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b border-brand-gray">
            <h2 className="text-2xl font-bold text-brand-charcoal">{isEditing ? 'Edit Cost' : 'Add Cost'}</h2>
            <p className="text-sm text-brand-text">For project: <span className="font-semibold">{project.name}</span></p>
          </div>

          <div className="p-6 space-y-4 max-h-[70vh] md:max-h-[60vh] overflow-y-auto">
            <div>
              <label htmlFor="description" className={labelStyles}>Description</label>
              <input type="text" name="description" id="description" value={formData.description} onChange={handleChange} required className={inputStyles} placeholder="e.g., Timber from Wickes" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="amount" className={labelStyles}>Amount (£)</label>
                    <input type="number" name="amount" id="amount" value={formData.amount} onChange={handleChange} required min="0.01" step="0.01" className={inputStyles} />
                </div>
                <div>
                    <label htmlFor="date" className={labelStyles}>Date</label>
                    <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required className={inputStyles} />
                </div>
            </div>
             <div>
                <label htmlFor="type" className={labelStyles}>Type</label>
                <select name="type" id="type" value={formData.type} onChange={handleChange} className={inputStyles}>
                    <option value="material">Material</option>
                    <option value="labor">Labor</option>
                </select>
             </div>
             <div>
                <label htmlFor="documentId" className={labelStyles}>Link to Document (Optional)</label>
                <select name="documentId" id="documentId" value={formData.documentId} onChange={handleChange} className={inputStyles}>
                    <option value="">None</option>
                    {projectDocuments.map(doc => (
                        <option key={doc.id} value={doc.id}>{doc.name}</option>
                    ))}
                </select>
             </div>
          </div>

          <div className="p-6 bg-brand-light-gray flex justify-end items-center rounded-b-xl space-x-3">
             <button type="button" onClick={onClose} className="px-5 py-2.5 bg-white border border-brand-gray text-brand-charcoal font-bold rounded-lg hover:bg-brand-gray transition">Cancel</button>
             <button type="submit" className="px-5 py-2.5 bg-brand-teal text-brand-charcoal font-bold rounded-lg shadow-sm hover:bg-opacity-90 transition">
                {isEditing ? 'Save Changes' : 'Save Cost'}
             </button>
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

export default CostModal;