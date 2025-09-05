
import React from 'react';

interface ToggleSwitchProps {
  isEnabled: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isEnabled, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal ${
        isEnabled ? 'bg-brand-teal' : 'bg-brand-gray'
      }`}
      role="switch"
      aria-checked={isEnabled}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 ${
          isEnabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;