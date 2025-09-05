
import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className="w-full bg-brand-gray rounded-full h-2">
      <div
        className="bg-brand-teal h-2 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${clampedProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;