import React from 'react';

interface KPICardProps {
  title: string;
  value: string;
  icon: React.ReactElement<{ className?: string }>;
  colorClass: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, icon, colorClass }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex items-center space-x-4 border border-brand-gray/50">
      <div className={`p-3 rounded-full ${colorClass}`}>
        {React.cloneElement(icon, { className: "w-6 h-6 text-white" })}
      </div>
      <div>
        <p className="text-sm font-semibold text-brand-text">{title}</p>
        <p className="text-2xl font-bold text-brand-charcoal">{value}</p>
      </div>
    </div>
  );
};

export default KPICard;