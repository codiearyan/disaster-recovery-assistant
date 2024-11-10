import React, { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import {
  CreateProgramModal,
  JoinProgramModal,
  ProgramCard,
  SuccessModal,
  MarqueeText,
} from "../components";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { volunteerService } from "../services/volunteer";
import { useAuthPopup } from "../hooks/useAuthPopup";
import { SignIn, SignUp } from "@clerk/clerk-react";

// Add interface for Program type
interface Program {
  id: string;
  title: string;
  description: string;
  created_by: string;
  email: string;
  phone_number: string;
  disaster_type: string;
  event_date: string;
  number_of_volunteers: number;
}

function VolunteerPage() {
  const authStatus = useSelector((state: RootState) => state.user.authStatus);
  const { openSignIn } = useAuthPopup();
  const { userDetails } = useSelector((state: RootState) => state.user);
  // Update the state to use Program type
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(
    null
  );
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await volunteerService.getVolunteerPrograms();
      // Ensure we're setting an array
      setPrograms(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Error fetching programs:", error);
      setPrograms([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const filteredPrograms = programs.filter(
    (program: Program) =>
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.disaster_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateClick = () => {
    console.log("Create button clicked");
    console.log("Auth status:", authStatus);

    if (!authStatus) {
      console.log("User not authenticated, opening sign-in");
      setShowAuthModal(true);
      return;
    }

    console.log("Opening create modal");
    setShowCreateModal(true);
  };

  const handleCreateProgram = async (data: any) => {
    try {
      console.log("Submitting program data:", data);

      if (!authStatus) {
        console.log("User not authenticated");
        openSignIn();
        return;
      }

      const programData = {
        title: data.title,
        description: data.description,
        created_by: userDetails?.username || "Anonymous",
        email: userDetails?.email || "",
        phone_number: userDetails?.phoneNumber || "",
        disaster_type: data.disaster,
        event_date: new Date(data.date).toISOString(),
        number_of_volunteers: parseInt(data.volunteers),
      };

      console.log("Sending program data:", programData);

      await volunteerService.createProgram(programData);
      setShowCreateModal(false);
      setSuccessMessage("Your program has been created successfully!");
      setShowSuccessModal(true);
      fetchPrograms(); // Refresh the programs list
    } catch (error) {
      console.error("Error creating program:", error);
      setSuccessMessage("Failed to create program. Please try again.");
      setShowSuccessModal(true);
    }
  };

  interface JoinFormData {
    skills: string;
    availability: string;
    age: number;
  }

  const handleJoinProgram = async (formData: any) => {
    try {
      if (!selectedProgramId) {
        throw new Error("No program selected");
      }
      console.log("Joining program with data:", formData);

      const joinData = {
        program_id: selectedProgramId,
        name: userDetails?.username || "Anonymous",
        email: userDetails?.email || "",
        phone_number: userDetails?.phoneNumber || "",
        age: formData.age,
        skills: formData.skills,
        availability: formData.availability,
      };

      console.log("Joining program with data:", joinData);

      await volunteerService.joinProgram(joinData);
      setShowJoinModal(false);
      setSuccessMessage("You have successfully joined the program!");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error joining program:", error);
      setSuccessMessage("Failed to join program. Please try again.");
      setShowSuccessModal(true);
    }
  };

  const handleAuthRequired = () => {
    openSignIn(); // This will open the Clerk sign-in popup
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setShowCreateModal(true);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <img
            src="https://images.pexels.com/photos/3280130/pexels-photo-3280130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Volunteer Programs Around You
          </h1>
          <p className="text-xl mb-8">
            Join hands to make a difference in your community
          </p>
          {/* <MarqueeText /> */}
        </div>
      </section>

      {/* Programs Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold dark:text-white">
            Hi, {userDetails?.firstName || userDetails?.username || "Guest"}
          </h2>
          <button
            type="button"
            onClick={() => handleCreateClick()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <Plus className="w-5 h-5" />
            Create Program
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by disaster type or program title..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-8 text-gray-700 dark:text-gray-300">
              Loading programs...
            </div>
          ) : filteredPrograms.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-700 dark:text-gray-300">
              {searchTerm
                ? "No matching programs found"
                : "No programs available"}
            </div>
          ) : (
            filteredPrograms.map((program: Program) => (
              <ProgramCard
                key={program.id}
                {...program}
                onJoin={() => {
                  setSelectedProgramId(program.id);
                  setShowJoinModal(true);
                }}
                onAuthRequired={handleAuthRequired}
              />
            ))
          )}
        </div>
      </section>

      {/* Modals */}
      <CreateProgramModal
        isOpen={showCreateModal}
        onClose={() => {
          console.log("Closing create modal");
          setShowCreateModal(false);
        }}
        onSubmit={handleCreateProgram}
      />
      <JoinProgramModal
        isOpen={showJoinModal}
        onClose={() => {
          setShowJoinModal(false);
          setSelectedProgramId(null);
        }}
        onSubmit={handleJoinProgram}
        programId={selectedProgramId!}
      />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
      />

      {/* Add Auth Modal */}
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
    </div>
  );
}

export default VolunteerPage;
