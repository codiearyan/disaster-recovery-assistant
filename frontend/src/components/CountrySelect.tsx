import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Country {
  name: string;
}

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CountrySelect({ value, onChange }: CountrySelectProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://localhost:8000/countries');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const searchCountries = async (query: string) => {
    try {
      const response = await fetch(`http://localhost:8000/countries/search?query=${query}`);
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error searching countries:', error);
    }
  };

  if (loading) {
    return (
      <div className="w-full border border-gray-300 rounded-lg py-3 px-4">
        Loading countries...
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search countries..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          searchCountries(e.target.value);
        }}
        className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
      />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white border border-gray-300 rounded-lg py-3 px-4 pr-12 
                 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 
                 focus:border-transparent cursor-pointer"
      >
        <option value="">Select Event Location</option>
        {countries.map((country) => (
          <option key={country.name} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ChevronDown className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
} 
