import React from 'react';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label: string;
}

export default function ToggleSwitch({ enabled, onChange, label }: ToggleSwitchProps) {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={enabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={`block w-14 h-8 rounded-full transition-colors duration-300 ease-in-out
                      ${enabled ? 'bg-green-500' : 'bg-gray-300'}`}>
        </div>
        <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform 
                      duration-300 ease-in-out ${enabled ? 'translate-x-6' : 'translate-x-0'}`}>
        </div>
      </div>
      <span className="ml-3 text-gray-700">{label}</span>
    </label>
  );
}