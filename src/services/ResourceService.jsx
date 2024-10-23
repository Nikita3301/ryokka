import axiosInstance from "src/axiosConfig";

const API_BASE_URL = 'http://localhost:8080/api/resources'; 


export const getResourcesByProjectId = async (projectId) => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}?projectId=${projectId}`);
      return response.data; // Assuming the API returns the resources in the response body
    } catch (error) {
      console.error("Error fetching resources:", error);
      throw error; // Propagate the error to handle it in the calling component
    }
  };
  
  // Function to create a new resource
  export const createResource = async (resourceData) => {
    try {
      const response = await axiosInstance.post(API_BASE_URL, resourceData);
      return response.data;
    } catch (error) {
      console.error("Error creating resource:", error);
      throw error;
    }
  };
  
  // Function to delete a resource
  export const deleteResource = async (resourceId) => {
    try {
      await axiosInstance.delete(`${API_BASE_URL}/${resourceId}`);
    } catch (error) {
      console.error("Error deleting resource:", error);
      throw error;
    }
  };
  
  // Optionally, you can add functions for updating resources or other related operations
  export const updateResource = async (resourceId, resourceData) => {
    try {
      const response = await axiosInstance.put(`${API_BASE_URL}/${resourceId}`, resourceData);
      return response.data; // Return the updated resource
    } catch (error) {
      console.error("Error updating resource:", error);
      throw error;
    }
  };