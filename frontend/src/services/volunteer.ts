import axios from "axios";
import { API_BASE_URL } from "../../constants";
const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

interface CreateProgramData {
  title: string;
  description: string;
  created_by: string;
  email: string;
  phone_number: string;
  disaster_type: string;
  event_date: string;
  number_of_volunteers: number;
}

interface JoinProgramData {
  program_id: string;
  name: string;
  email: string;
  phone_number: string;
  age: number;
  skills: string;
  availability: string;
}

export const volunteerService = {
  // Get all programs
  getVolunteerPrograms: async () => {
    const response = await axiosInstance.get("/volunteer/programs");
    return response.data;
  },

  // Create a new program
  createProgram: async (data: CreateProgramData) => {
    const response = await axiosInstance.post("/volunteer/programs", data);
    return response.data;
  },

  // Join a program
  joinProgram: async (data: JoinProgramData) => {
    const response = await axiosInstance.post(
      `/volunteer/programs/${data.program_id}/members`,
      data
    );
    return response.data;
  },

  // Delete a program
  deleteProgram: async (programId: string) => {
    const response = await axiosInstance.delete(
      `/volunteer/programs/${programId}/delete`
    );
    return response.data;
  },

  // Get program by ID
  getProgramById: async (programId: string) => {
    const response = await axiosInstance.get(
      `/volunteer/programs/${programId}/get`
    );
    return response.data;
  },
};
