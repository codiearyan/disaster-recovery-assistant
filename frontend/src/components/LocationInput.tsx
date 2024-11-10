import React, { useState, useEffect } from 'react';
import { MapPin, Search, Check, ChevronDown } from 'lucide-react';

interface LocationOption {
  name: string;
}

interface LocationInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function LocationInput({ value, onChange }: LocationInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/volunteer/countries`);
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setLocations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch countries');
        console.error('Error fetching countries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const toggleOption = (locationName: string) => {
    if (value.includes(locationName)) {
      onChange(value.filter(v => v !== locationName));
    } else {
      if (value.length >= 5) {
        return;
      }
      onChange([...value, locationName]);
    }
  };

  const selectedLocations = locations.filter(l => value.includes(l.name));

  if (loading) {
    return <div className="text-gray-500">Loading countries...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-h-[44px] bg-white border border-gray-300 rounded-lg py-2 px-4 pr-12 
                  text-gray-700 cursor-pointer flex flex-col items-start gap-1"
      >
        {selectedLocations.length === 0 ? (
          <span className="text-gray-500">Select Disaster Event Location (Max 5)</span>
        ) : (
          <div className="flex flex-col gap-1 w-full">
            {selectedLocations.map(location => (
              <span
                key={location.name}
                className="inline-flex items-center gap-1 bg-gray-100 text-black px-2 py-1 rounded-md text-sm w-full"
              >
                <MapPin className="w-4 h-4" />
                {location.name}
              </span>
            ))}
          </div>
        )}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {locations.map((location) => (
            <div
              key={location.name}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-50 flex items-center justify-between 
                ${value.length >= 5 && !value.includes(location.name) ? 'opacity-50 cursor-not-allowed' : 'text-black'}`}
              onClick={() => toggleOption(location.name)}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {location.name}
              </div>
              {value.includes(location.name) && (
                <Check className="h-4 w-4 text-black" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}