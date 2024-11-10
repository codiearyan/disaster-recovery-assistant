import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import {
  CreateProgramModal,
  JoinProgramModal,
  ProgramCard,
  SuccessModal,
  MarqueeText,
} from "../components";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

// Sample data
const MOCK_PROGRAMS = [
  {
    id: 1,
    title: "Flood Relief Support",
    description:
      "Join us in providing essential support to flood-affected communities in the region.",
    organizer: "John Doe",
    email: "john@relief.org",
    date: "2024-03-25",
    disaster: "Flood",
    image:
      "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Earthquake Response Team",
    description:
      "Emergency response team formation for recent earthquake victims.",
    organizer: "Sarah Smith",
    email: "sarah@disaster-relief.org",
    date: "2024-03-28",
    disaster: "Earthquake",
    image:
      "https://images.unsplash.com/photo-1587653263995-422546a7a569?auto=format&fit=crop&q=80&w=800",
  },
];

function VolunteerPage() {
  const { userDetails } = useSelector((state: RootState) => state.user);
  const [programs, setPrograms] = useState(MOCK_PROGRAMS);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const filteredPrograms = programs.filter(
    (program) =>
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.disaster.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateProgram = (data: any) => {
    const newProgram = {
      id: programs.length + 1,
      ...data,
      organizer: "Current User",
      email: "user@example.com",
      image:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
    };
    setPrograms([...programs, newProgram]);
    setShowCreateModal(false);
    setSuccessMessage("Your program has been submitted for approval!");
    setShowSuccessModal(true);
  };

  const handleJoinProgram = (data: any) => {
    setShowJoinModal(false);
    setSuccessMessage("Your application has been submitted successfully!");
    setShowSuccessModal(true);
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <img
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=1920"
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
          <MarqueeText />
        </div>
      </section>

      {/* Programs Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold dark:text-white">
            Hi, {userDetails?.firstName || userDetails?.username}
          </h2>
          <button
            onClick={() => setShowCreateModal(true)}
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
          {filteredPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              {...program}
              onJoin={() => setShowJoinModal(true)}
            />
          ))}
        </div>
      </section>

      {/* Modals */}
      <CreateProgramModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateProgram}
      />
      <JoinProgramModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onSubmit={handleJoinProgram}
      />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
      />
    </div>
  );
}

export default VolunteerPage;
