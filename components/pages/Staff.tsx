

import React, { useState } from 'react';
import { StaffMember } from '../../types';
import { useData } from '../../hooks/useData';
import { PlusIcon, BriefcaseIcon } from '../icons/Icons.tsx';
import Placeholder from '../ui/Placeholder';
import StaffCard from '../staff/StaffCard';
import StaffModal from '../staff/StaffModal';

const Staff: React.FC = () => {
  const { staffMembers, addStaff, updateStaff, deleteStaff } = useData();
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);

  const handleOpenStaffModal = (staff: StaffMember | null = null) => {
    setEditingStaff(staff);
    setIsStaffModalOpen(true);
  };

  const handleCloseStaffModal = () => {
    setIsStaffModalOpen(false);
    setEditingStaff(null);
  };

  const handleSaveStaff = async (staffToSave: Omit<StaffMember, 'id'> & { id?: string }) => {
    if (staffToSave.id) { // Editing
        const originalStaff = staffMembers.find(s => s.id === staffToSave.id);
        if (originalStaff?.isSample) {
            alert("Sample staff members are read-only and cannot be edited.");
            handleCloseStaffModal();
            return;
        }
    }
    try {
      if (staffToSave.id) {
        updateStaff(staffToSave as StaffMember);
      } else {
        addStaff(staffToSave);
      }
    } catch (error) {
      console.error("Error saving staff member: ", error);
      alert("There was an error saving the staff member. Please try again.");
    } finally {
      handleCloseStaffModal();
    }
  };

  const handleDeleteStaff = async (staffId: string) => {
    const staffToDelete = staffMembers.find(s => s.id === staffId);
    if (staffToDelete?.isSample) {
        alert("Sample staff members are read-only and cannot be deleted.");
        return;
    }
    if (!window.confirm('Are you sure you want to delete this staff member? This cannot be undone.')) {
        return;
    }
    try {
        deleteStaff(staffId);
    } catch (error) {
        console.error("Error deleting staff member: ", error);
        alert("There was an error deleting the staff member. Please try again.");
    } finally {
        handleCloseStaffModal();
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-brand-charcoal">Staff Management</h1>
            <button 
                onClick={() => handleOpenStaffModal()}
                className="flex items-center justify-center bg-brand-teal text-brand-charcoal font-bold px-5 py-2.5 rounded-lg shadow-sm hover:bg-opacity-90 transition-transform transform hover:scale-105"
            >
                <PlusIcon className="w-5 h-5 mr-2" />
                New Staff
            </button>
        </div>

        {staffMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {staffMembers.map(staff => (
                <StaffCard 
                    key={staff.id} 
                    staffMember={staff} 
                    onEdit={handleOpenStaffModal}
                    onDelete={handleDeleteStaff}
                />
              ))}
          </div>
        ) : (
          <div className="mt-10">
              <Placeholder 
                  icon={<BriefcaseIcon />}
                  title="No Staff Members Found"
                  message="Add your first staff member to begin managing your team."
              />
          </div>
        )}
      </div>
      {isStaffModalOpen && (
        <StaffModal
          staffMember={editingStaff}
          onClose={handleCloseStaffModal}
          onSave={handleSaveStaff}
          onDelete={handleDeleteStaff}
        />
      )}
    </>
  );
};

export default Staff;