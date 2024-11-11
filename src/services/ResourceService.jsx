import axiosInstance from "src/axiosConfig";

const API_BASE_URL = 'http://localhost:8080/api/resources'; 


export const getResourcesByProjectId = async (projectId) => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}?projectId=${projectId}`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching resources:", error);
      throw error; 
    }
  };
  
  export const createResource = async (resourceData) => {
    try {
      const response = await axiosInstance.post(API_BASE_URL, resourceData);
      return response.data;
    } catch (error) {
      console.error("Error creating resource:", error);
      throw error;
    }
  };
  
  export const deleteResource = async (resourceId) => {
    try {
      await axiosInstance.delete(`${API_BASE_URL}/${resourceId}`);
    } catch (error) {
      console.error("Error deleting resource:", error);
      throw error;
    }
  };
  
  export const updateResource = async (resourceId, resourceData) => {
    try {
      const response = await axiosInstance.put(`${API_BASE_URL}/${resourceId}`, resourceData);
      return response.data; 
    } catch (error) {
      console.error("Error updating resource:", error);
      throw error;
    }
  };