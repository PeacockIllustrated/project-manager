
import React from 'react';

interface BadgeProps {
  text: string;
  color: 'green' | 'red' | 'yellow' | 'blue' | 'gray';
}

const Badge: React.FC<BadgeProps> = ({ text, color }) => {
  const colorClasses = {
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    blue: 'bg-blue-100 text-blue-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${colorClasses[color]}`}>
      {text}
    </span>
  );
};

export default Badge;