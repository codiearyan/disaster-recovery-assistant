import React from 'react';
import { Shield } from 'lucide-react';
import { DisasterCard } from '../components/DisasterCard'; // Correct import for DisasterCard
import disasterData from '../components/DisasterData'; // Correct import for disaster data

interface DisasterItem {
  color: string;
  precautions: string[];
  title: string;
  icon: React.ReactNode;
}

function Precaution() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <Shield size={48} className="mr-4" />
            <h1 className="text-4xl font-bold">Disaster Recovery Assistant</h1>
          </div>
          <p className="text-center text-xl max-w-2xl mx-auto">
            Stay prepared and informed with our comprehensive guide to disaster safety protocols.
            Your safety is our priority.
          </p>
        </div>
      </div>

      {/* Precautions Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Safety Protocols for Disaster Prevention
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {disasterData.map((disaster: DisasterItem, index: number) => (
            <DisasterCard
              key={index}
              title={disaster.title}
              icon={disaster.icon}
              precautions={disaster.precautions}
              color={disaster.color}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Stay informed and prepared. For more detailed information, contact your local emergency services.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Precaution;
