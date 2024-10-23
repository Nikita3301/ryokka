import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/project-employees'; // Base URL for the project-employee API

// Create an axios instance for API requests
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Assign an employee to a project
export const assignEmployeeToProject = async (employeeId, projectId, startDate, endDate, role) => {
  try {
    const response = await axiosInstance.post('/assign', null, {
      params: {
        employeeId: employeeId,
        projectId: projectId,
        startDate: startDate,
        endDate: endDate,
        role: role,
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error assigning employee to project:', error);
    throw error; // Rethrow error for handling in the component
  }
};

// Remove an employee from a project
export const removeEmployeeFromProject = async (employeeId, projectId) => {
  try {
    const response = await axiosInstance.delete('/remove', {
      params: {
        employeeId: employeeId,
        projectId: projectId,
      },
    });
    return response.data; // Return the API response
  } catch (error) {
    console.error('Error removing employee from project:', error);
    throw error; // Rethrow error for handling in the component
  }
};

// Get all employees assigned to a specific project
export const getEmployeesByProject = async (projectId) => {
  try {
    const response = await axiosInstance.get('/employees', {
      params: {
        projectId: projectId,
      },
    });
    return response.data; // Return the list of employees
  } catch (error) {
    console.error('Error fetching employees by project:', error);
    throw error; // Rethrow error for handling in the component
  }
};

// Get all projects assigned to a specific employee
export const getProjectsByEmployee = async (employeeId) => {
  try {
    const response = await axiosInstance.get('/projects', {
      params: {
        employeeId: employeeId,
      },
    });
    return response.data; // Return the list of projects
  } catch (error) {
    console.error('Error fetching projects by employee:', error);
    throw error; // Rethrow error for handling in the component
  }
};
