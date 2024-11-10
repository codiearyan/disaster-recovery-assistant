import React, { useState } from 'react';
import DisasterSelect from './DisasterSelect';

export default function EventForm() {
  const [selectedDisasters, setSelectedDisasters] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      disasters: selectedDisasters
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Disaster Types
        </label>
        <DisasterSelect
          value={selectedDisasters}
          onChange={setSelectedDisasters}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
} 