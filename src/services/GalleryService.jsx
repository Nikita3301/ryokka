import axiosInstance from "src/axiosConfig";

const API_BASE_URL = 'http://localhost:8080/api/project-images'; 


export const getAllProjectImages = async () => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/all`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  };

  export const getProjectImagesById = async (projectId) => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/${projectId}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  };