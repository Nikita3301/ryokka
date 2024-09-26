import axiosInstance from "src/axiosConfig";

const API_BASE_URL = "http://localhost:8080/api/clients";

export const getAllClients = async () => {
    try {
      const response = await axiosInstance.get(API_BASE_URL);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  };

  export const getAllClientsWithoutProjects = async () => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/without-projects`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  };