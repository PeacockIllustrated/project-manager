import React from 'react';

interface PlaceholderProps {
  // FIX: Changed icon prop type to be more specific, ensuring it accepts a className prop for React.cloneElement.
  icon: React.ReactElement<{ className?: string }>;
  title: string;
  message: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ icon, title, message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white rounded-xl border border-brand-gray p-8 text-center">
      <div className="text-brand-teal mb-4">
        {React.cloneElement(icon, { className: "w-16 h-16 opacity-50" })}
      </div>
      <h2 className="text-2xl font-bold text-brand-charcoal">{title}</h2>
      <p className="mt-2 max-w-md text-brand-text">{message}</p>
    </div>
  );
};

export default Placeholder;