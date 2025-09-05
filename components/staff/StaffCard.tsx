
import React, { useState, useRef, useEffect } from 'react';
import { StaffMember } from '../../types';
import { MoreHorizontalIcon, EditIcon, TrashIcon, MailIcon, PhoneIcon } from '../icons/Icons.tsx';

interface StaffCardProps {
  staffMember: StaffMember;
  onEdit: (staffMember: StaffMember) => void;
  onDelete: (staffId: string) => void;
}

const StaffCard: React.FC<StaffCardProps> = ({ staffMember, onEdit, onDelete }) => {
  const { name, avatarUrl, role, email, phone } = staffMember;
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
  
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-brand-gray/50 flex flex-col">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
                <img src={avatarUrl || 'https://picsum.photos/100'} alt={name} className="w-16 h-16 rounded-full object-cover border-2 border-brand-teal"/>
                <div>
                    <h3 className="text-lg font-bold text-brand-charcoal truncate">{name}</h3>
                    <p className="text-sm font-semibold text-brand-teal">{role}</p>
                </div>
            </div>
            <div className="relative" ref={menuRef}>
                <button 
                    className="text-gray-400 hover:text-brand-charcoal p-1 -m-1"
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    aria-label="Staff options"
                >
                    <MoreHorizontalIcon />
                </button>
                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border border-brand-gray animate-fade-in-scale-sm" style={{animationFillMode: 'forwards'}}>
                        <div className="p-1">
                            <button onClick={() => onEdit(staffMember)} className="w-full text-left px-3 py-2 text-sm text-brand-charcoal hover:bg-brand-gray rounded-md flex items-center transition-colors">
                                <EditIcon className="w-4 h-4 mr-3 text-brand-text"/> Edit Member
                            </button>
                             <div className="my-1 h-px bg-brand-gray"></div>
                             <button onClick={() => onDelete(staffMember.id)} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center transition-colors">
                                <TrashIcon className="w-4 h-4 mr-3"/> Delete Member
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
       <div className="p-5 bg-brand-light-gray/50 border-t border-brand-gray space-y-3">
         <div className="flex items-center text-sm">
            <MailIcon className="w-4 h-4 mr-3 text-brand-text" />
            <a href={`mailto:${email}`} className="text-brand-charcoal hover:text-brand-teal transition-colors">{email}</a>
         </div>
         <div className="flex items-center text-sm">
            <PhoneIcon className="w-4 h-4 mr-3 text-brand-text" />
            <a href={`tel:${phone}`} className="text-brand-charcoal hover:text-brand-teal transition-colors">{phone}</a>
         </div>
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

export default StaffCard;