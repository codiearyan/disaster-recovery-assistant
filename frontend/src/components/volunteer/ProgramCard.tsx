import React from "react";
import { Calendar, Mail, Users } from "lucide-react";

interface ProgramProps {
  title: string;
  description: string;
  organizer: string;
  email: string;
  date: string;
  disaster: string;
  image: string;
  onJoin: () => void;
}

export const ProgramCard: React.FC<ProgramProps> = ({
  title,
  description,
  organizer,
  email,
  date,
  disaster,
  image,
  onJoin,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-full">
          {disaster}
        </div>
        <h3 className="text-xl font-bold mb-2 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>

        <div className="space-y-2">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Users className="w-4 h-4 mr-2" />
            <span>{organizer}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Mail className="w-4 h-4 mr-2" />
            <span>{email}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{date}</span>
          </div>
        </div>

        <button
          onClick={onJoin}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Join the Programme
        </button>
      </div>
    </div>
  );
};
