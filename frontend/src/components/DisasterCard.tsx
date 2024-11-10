import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DisasterCardProps {
  title: string;
  icon: React.ReactNode;
  precautions: string[];
  color: string;
}

export function DisasterCard({ title, icon, precautions, color }: DisasterCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className={`${color} rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl`}>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-6 focus:outline-none"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>
          {isExpanded ? (
            <ChevronUp className="text-white" />
          ) : (
            <ChevronDown className="text-white" />
          )}
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-6 pb-6">
          <ul className="space-y-2 text-white">
            {precautions.map((precaution, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 mt-1.5">•</span>
                <span>{precaution}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DisasterCard;
