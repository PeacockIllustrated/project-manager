

import React, { useState } from 'react';
import { Page, ChangeRequestPriority } from '../../types';
import { LightbulbIcon } from '../icons/Icons.tsx';
import { useData } from '../../hooks/useData';

const ChangeRequestForm: React.FC = () => {
  const [description, setDescription] = useState('');
  const [featureArea, setFeatureArea] = useState<Page>('Project Hub');
  const [priority, setPriority] = useState<ChangeRequestPriority>(ChangeRequestPriority.Medium);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { addChangeRequest } = useData();
  
  const featureAreas: Page[] = ['Project Hub', 'Tasks', 'Schedule', 'Staff', 'Documents', 'Financials', 'Client Portal', 'Settings'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setSubmitError("Please provide a description for your request.");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);

    try {
      addChangeRequest({ description, featureArea, priority });
      setSubmitSuccess(true);
      setDescription('');
      setFeatureArea('Project Hub');
      setPriority(ChangeRequestPriority.Medium);
      setTimeout(() => setSubmitSuccess(false), 5000); // Hide success message after 5s
    } catch (error) {
      console.error("Error submitting change request: ", error);
      setSubmitError("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = "w-full text-brand-charcoal bg-white border border-gray-300 rounded-lg px-3 py-2 transition-shadow focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal focus:outline-none";
  const labelStyles = "block text-sm font-semibold text-brand-charcoal mb-1";
  
  return (
    <div className="bg-white rounded-xl shadow-md border border-brand-gray/50">
      <div className="p-6 border-b border-brand-gray flex items-center space-x-3">
        <LightbulbIcon className="w-6 h-6 text-brand-teal"/>
        <div>
            <h2 className="text-xl font-bold text-brand-charcoal">Log a Change Request</h2>
            <p className="text-sm text-brand-text">Have an idea for an improvement? Log it here for the development team.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="description" className={labelStyles}>Request Details</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={inputStyles}
              placeholder="Please describe the change or new feature you'd like..."
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="featureArea" className={labelStyles}>Feature Area</label>
              <select
                id="featureArea"
                value={featureArea}
                onChange={(e) => setFeatureArea(e.target.value as Page)}
                className={inputStyles}
              >
                {featureAreas.map(area => <option key={area} value={area}>{area}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="priority" className={labelStyles}>Priority</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as ChangeRequestPriority)}
                className={inputStyles}
              >
                {Object.values(ChangeRequestPriority).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          {submitSuccess && (
            <div className="p-3 bg-green-100 text-green-800 border border-green-200 rounded-lg text-sm">
                Thank you! Your request has been successfully logged.
            </div>
          )}
           {submitError && (
            <div className="p-3 bg-red-100 text-red-800 border border-red-200 rounded-lg text-sm">
                {submitError}
            </div>
          )}
        </div>
        <div className="p-6 bg-brand-light-gray flex justify-end rounded-b-xl">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-brand-teal text-brand-charcoal font-bold rounded-lg shadow-sm hover:bg-opacity-90 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeRequestForm;