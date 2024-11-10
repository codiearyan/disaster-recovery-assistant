import React, { useState } from 'react';
import { 
  Flame, 
  Waves, 
  Wind, 
  CloudRain, 
  Activity, 
  CloudLightning,
  ChevronDown,
  Mountain,
  Sun,
  Snowflake,
  Thermometer,
  Cloud,
  Check
} from 'lucide-react';

interface DisasterOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const disasters: DisasterOption[] = [
  { value: 'earthquake', label: 'Earthquake', icon: <Activity className="w-5 h-5" /> },
  { value: 'flood', label: 'Flood', icon: <CloudRain className="w-5 h-5" /> },
  { value: 'wildfire', label: 'Wildfire', icon: <Flame className="w-5 h-5" /> },
  { value: 'hurricane', label: 'Hurricane', icon: <CloudLightning className="w-5 h-5" /> },
  { value: 'tornado', label: 'Tornado', icon: <Wind className="w-5 h-5" /> },
  { value: 'tsunami', label: 'Tsunami', icon: <Waves className="w-5 h-5" /> },
  { value: 'landslide', label: 'Landslide', icon: <Mountain className="w-5 h-5" /> },
  { value: 'drought', label: 'Drought', icon: <Sun className="w-5 h-5" /> },
  { value: 'volcanic_eruption', label: 'Volcanic Eruption', icon: <Mountain className="w-5 h-5" /> },
  { value: 'blizzard', label: 'Blizzard', icon: <Snowflake className="w-5 h-5" /> },
  { value: 'heatwave', label: 'Heat Wave', icon: <Thermometer className="w-5 h-5" /> },
  { value: 'thunderstorm', label: 'Thunderstorm', icon: <Cloud className="w-5 h-5" /> },
  { value: 'cyclone', label: 'Cyclone', icon: <Wind className="w-5 h-5" /> },
  { value: 'avalanche', label: 'Avalanche', icon: <Mountain className="w-5 h-5" /> },
  { value: 'dust_storm', label: 'Dust Storm', icon: <Wind className="w-5 h-5" /> },
  { value: 'ice_storm', label: 'Ice Storm', icon: <Snowflake className="w-5 h-5" /> },
];

interface DisasterSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function DisasterSelect({ value, onChange }: DisasterSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (disasterValue: string) => {
    if (value.includes(disasterValue)) {
      onChange(value.filter(v => v !== disasterValue));
    } else {
      onChange([...value, disasterValue]);
    }
  };

  const toggleAll = () => {
    if (value.length === disasters.length) {
      onChange([]);
    } else {
      onChange(disasters.map(d => d.value));
    }
  };

  const selectedDisasters = disasters.filter(d => value.includes(d.value));

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-h-[44px] bg-white border border-gray-300 rounded-lg py-2 px-4 pr-12 
                  text-gray-700 cursor-pointer flex items-center flex-wrap gap-1"
      > 
        {selectedDisasters.length === 0 ? (
          <span className="text-gray-500">Select Disaster Type</span>
        ) : (
          selectedDisasters.map(disaster => (
            <span
              key={disaster.value}
              className="inline-flex items-center gap-1 bg-gray-100 text-black px-2 py-1 rounded-md text-sm"
            >
              {disaster.icon}
              {disaster.label}
            </span>
          ))
        )}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          <div
            className="px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-50 flex items-center justify-between text-black"
            onClick={toggleAll}
          >
            <span className="font-medium">Select All</span>
            {value.length === disasters.length && (
              <Check className="h-4 w-4 text-black" />
            )}
          </div>
          {disasters.map((disaster) => (
            <div
              key={disaster.value}
              className="px-4 py-2 cursor-pointer hover:bg-gray-50 flex items-center justify-between text-black"
              onClick={() => toggleOption(disaster.value)}
            >
              <div className="flex items-center gap-2">
                {disaster.icon}
                {disaster.label}
              </div>
              {value.includes(disaster.value) && (
                <Check className="h-4 w-4 text-black" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}