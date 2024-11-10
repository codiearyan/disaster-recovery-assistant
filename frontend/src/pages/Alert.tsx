import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import DisasterSelect from '../components/DisasterSelect';
import LocationInput from '../components/LocationInput';
import ToggleSwitch from '../components/ToggleSwitch';

function Alert() {
  const [disasterType, setDisasterType] = useState('');
  const [location, setLocation] = useState('');
  const [alertsEnabled, setAlertsEnabled] = useState(false);

  const handleSubscribe = () => {
    if (!disasterType || !location) {
      alert('Please select both disaster type and location');
      return;
    }
    // Handle subscription logic here
    console.log('Subscribed:', { disasterType, location, alertsEnabled });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 px-6 py-8 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Bell className="h-8 w-8" />
              <h1 className="text-3xl font-bold">Disaster Alert Subscription</h1>
            </div>
            <p className="text-blue-100">
              Stay informed about natural disasters in your area. Select the disaster type and 
              location to receive real-time alerts.
            </p>
          </div>

          {/* Main Content */}
          <div className="p-6 space-y-6">
            {/* Disaster Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Select Disaster Event
              </label>
              <DisasterSelect value={disasterType} onChange={setDisasterType} />
            </div>

            {/* Location Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Select Disaster Event Location
              </label>
              <LocationInput
                value={location}
                onChange={setLocation}
                onSearch={() => console.log('Searching location...')}
              />
            </div>

            {/* Alert Toggle */}
            <div className="pt-4">
              <ToggleSwitch
                enabled={alertsEnabled}
                onChange={setAlertsEnabled}
                label="Enable Alerts"
              />
            </div>

            {/* Subscribe Button */}
            <div className="pt-4">
              <button
                onClick={handleSubscribe}
                className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 
                         text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 
                         ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Subscribe Now
              </button>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                You will receive notifications about selected disasters at the specified location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alert;