import axiosInstance from "src/axiosConfig";

const API_BASE_URL = 'http://localhost:8080/api/projects'; 


export const getAllProjects = async () => {
  try {
    const response = await axiosInstance.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};


export const getProjectById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    throw error;
  }
};


export const createProject = async (project) => {
  try {
    const response = await axiosInstance.post(API_BASE_URL, project);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const updateProject = async (id, project) => {
  try {
    const response = await axiosInstance.put(`${API_BASE_URL}/${id}`, project);
    return response.data;
  } catch (error) {
    console.error(`Error updating project with ID ${id}:`, error);
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    await axiosInstance.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting project with ID ${id}:`, error);
    throw error;
  }
};
