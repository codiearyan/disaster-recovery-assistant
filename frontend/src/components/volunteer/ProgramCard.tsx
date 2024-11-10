import React, { useState } from "react";
import { Calendar, Mail, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ProgramProps {
  id: string;
  title: string;
  description: string;
  created_by: string;
  email: string;
  event_date: string;
  disaster_type: string;
  number_of_volunteers: number;
  onJoin: (programId: string) => void;
  onAuthRequired: () => void;
}

export const ProgramCard: React.FC<ProgramProps> = ({
  id,
  title,
  description,
  created_by,
  email,
  event_date,
  disaster_type,
  number_of_volunteers,
  onJoin,
}) => {
  const authStatus = useSelector((state: RootState) => state.user.authStatus);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleJoinClick = () => {
    if (!authStatus) {
      setShowAuthModal(true);
      return;
    }
    onJoin(id);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    onJoin(id);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
        <div className="p-6">
          <div className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-full">
            {disaster_type}
          </div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>

          <div className="space-y-2">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Users className="w-4 h-4 mr-2" />
              <span>{created_by}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Mail className="w-4 h-4 mr-2" />
              <span>{email}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{new Date(event_date).toLocaleDateString()}</span>
            </div>
          </div>

          <button
            onClick={handleJoinClick}
            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Join the Programme
          </button>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            {isSignUp ? (
              <SignUp
                routing="virtual"
                redirectUrl={window.location.href}
                appearance={{
                  elements: {
                    footerActionLink: {
                      onClick: (e) => {
                        e.preventDefault();
                        toggleMode();
                      },
                    },
                    rootBox: {
                      boxShadow: "none",
                    },
                  },
                }}
                afterSignUp={(data) => {
                  handleAuthSuccess();
                  return false;
                }}
              />
            ) : (
              <SignIn
                routing="virtual"
                redirectUrl={window.location.href}
                appearance={{
                  elements: {
                    footerActionLink: {
                      onClick: (e) => {
                        e.preventDefault();
                        toggleMode();
                      },
                    },
                    rootBox: {
                      boxShadow: "none",
                    },
                  },
                }}
                afterSignIn={(data) => {
                  handleAuthSuccess();
                  return false;
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
