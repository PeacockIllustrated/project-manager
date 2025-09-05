
import React, { useState, useEffect } from 'react';
import { StaffMember } from '../../types';
import { TrashIcon } from '../icons/Icons.tsx';

interface StaffModalProps {
  staffMember: StaffMember | null;
  onClose: () => void;
  onSave: (staffMember: Omit<StaffMember, 'id'> & { id?: string }) => void;
  onDelete: (staffId: string) => void;
}

const StaffModal: React.FC<StaffModalProps> = ({ staffMember, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState<Omit<StaffMember, 'id'>>({
    name: '',
    role: '',
    email: '',
    phone: '',
    avatarUrl: '',
  });

  useEffect(() => {
    if (staffMember) {
        const { id, ...staffData } = staffMember;
        setFormData(staffData);
    } else {
        // Reset for new staff member
        setFormData({
            name: '',
            role: '',
            email: '',
            phone: '',
            avatarUrl: 'https://picsum.photos/100', // Default avatar
        });
    }
  }, [staffMember]);
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) {
        alert('Please fill in all required fields (Name, Role, and Email).');
        return;
    };
    onSave({ ...formData, id: staffMember?.id });
  };

  const handleDelete = () => {
    if (staffMember) {
      onDelete(staffMember.id);
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
            <h2 className="text-2xl font-bold text-brand-charcoal">{staffMember ? 'Edit Staff Member' : 'Add New Staff Member'}</h2>
          </div>

          <div className="p-6 space-y-4 max-h-[70vh] md:max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className={labelStyles}>Full Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className={inputStyles} />
              </div>
              <div>
                <label htmlFor="role" className={labelStyles}>Role</label>
                <input type="text" name="role" id="role" value={formData.role} onChange={handleChange} required className={inputStyles} />
              </div>
               <div className="md:col-span-2">
                <label htmlFor="email" className={labelStyles}>Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className={inputStyles} />
              </div>
               <div>
                <label htmlFor="phone" className={labelStyles}>Phone</label>
                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className={inputStyles} />
              </div>
               <div>
                <label htmlFor="avatarUrl" className={labelStyles}>Avatar URL</label>
                <input type="text" name="avatarUrl" id="avatarUrl" value={formData.avatarUrl} onChange={handleChange} className={inputStyles} />
              </div>
            </div>
          </div>

          <div className="p-6 bg-brand-light-gray flex justify-between items-center rounded-b-xl">
             {staffMember && (
                <button type="button" onClick={handleDelete} className="text-red-600 hover:text-red-800 font-semibold p-2 rounded-md hover:bg-red-100 transition-colors flex items-center">
                    <TrashIcon className="w-5 h-5 mr-1.5" /> Delete Member
                </button>
             )}
             <div className="flex-grow flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="px-5 py-2.5 bg-white border border-brand-gray text-brand-charcoal font-bold rounded-lg hover:bg-brand-gray transition">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-brand-teal text-brand-charcoal font-bold rounded-lg shadow-sm hover:bg-opacity-90 transition">{staffMember ? 'Save Changes' : 'Create Member'}</button>
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

export default StaffModal;