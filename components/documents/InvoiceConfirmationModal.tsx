
import React, { useState, useEffect } from 'react';
import { InvoiceData } from '../../types';

interface InvoiceConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: InvoiceData) => void;
  initialData: InvoiceData;
  imageUrl: string;
}

const InvoiceConfirmationModal: React.FC<InvoiceConfirmationModalProps> = ({ isOpen, onClose, onConfirm, initialData, imageUrl }) => {
  const [formData, setFormData] = useState<InvoiceData>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ 
        ...prev, 
        [name]: type === 'number' ? parseFloat(value) || 0 : value 
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(formData);
  };

  if (!isOpen) return null;

  const inputStyles = "w-full text-brand-charcoal bg-white border border-gray-300 rounded-lg px-3 py-2 transition-shadow focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal focus:outline-none";
  const labelStyles = "block text-sm font-semibold text-brand-charcoal mb-1";

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-11/12 max-w-lg md:max-w-4xl transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={e => e.stopPropagation()}
        style={{ animationFillMode: 'forwards' }}
      >
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b border-brand-gray">
            <h2 className="text-2xl font-bold text-brand-charcoal">Confirm Invoice Details</h2>
            <p className="text-sm text-brand-text">Please verify the information extracted by the AI.</p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[80vh] overflow-y-auto">
            <div className="space-y-4">
              <div>
                <label htmlFor="vendor" className={labelStyles}>Vendor</label>
                <input type="text" name="vendor" id="vendor" value={formData.vendor} onChange={handleChange} required className={inputStyles} />
              </div>
              <div>
                <label htmlFor="date" className={labelStyles}>Date</label>
                <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required className={inputStyles} />
              </div>
              <div>
                <label htmlFor="totalAmount" className={labelStyles}>Total Amount (£)</label>
                <input type="number" name="totalAmount" id="totalAmount" value={formData.totalAmount} onChange={handleChange} required min="0" step="0.01" className={inputStyles} />
              </div>
            </div>
            <div className="bg-brand-light-gray rounded-lg p-2 border border-brand-gray">
                <img src={imageUrl} alt="Invoice Preview" className="w-full h-full object-contain rounded" />
            </div>
          </div>

          <div className="p-6 bg-brand-light-gray flex justify-end items-center rounded-b-xl space-x-3">
             <button type="button" onClick={onClose} className="px-5 py-2.5 bg-white border border-brand-gray text-brand-charcoal font-bold rounded-lg hover:bg-brand-gray transition">Cancel</button>
             <button type="submit" className="px-5 py-2.5 bg-brand-teal text-brand-charcoal font-bold rounded-lg shadow-sm hover:bg-opacity-90 transition">Confirm and Log Cost</button>
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

export default InvoiceConfirmationModal;