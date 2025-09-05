import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-brand-light-gray">
            <div className="w-16 h-16 border-4 border-brand-teal border-dashed rounded-full animate-spin"></div>
             <div className="flex items-center space-x-3 mt-6">
               <div className="w-10 h-10 bg-brand-teal flex items-center justify-center rounded-lg">
                  <svg className="w-6 h-6 text-brand-charcoal" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H10V10H4V4Z" opacity="0.8"/>
                    <path d="M4 14H10V20H4V14Z"/>
                    <path d="M14 4H20V10H14V4Z"/>
                    <path d="M14 14H20V20H14V14Z" opacity="0.6"/>
                  </svg>
                </div>
              <div>
                <h1 className="text-brand-charcoal text-xl font-bold tracking-tighter leading-tight">Your Brand</h1>
                <p className="text-brand-teal text-xs tracking-widest leading-tight">PROJECTS</p>
              </div>
            </div>
            <p className="text-brand-text font-semibold mt-4">Loading Dashboard...</p>
        </div>
    );
};

export default LoadingSpinner;