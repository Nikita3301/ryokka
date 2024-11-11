import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/project-employees';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
    throw error;
  }
};

export const removeEmployeeFromProject = async (employeeId, projectId) => {
  try {
    const response = await axiosInstance.delete('/remove', {
      params: {
        employeeId: employeeId,
        projectId: projectId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error removing employee from project:', error);
    throw error;
  }
};

export const getEmployeesByProject = async (projectId) => {
  try {
    const response = await axiosInstance.get('/employees', {
      params: {
        projectId: projectId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching employees by project:', error);
    throw error; 
  }
};

export const getProjectsByEmployee = async (employeeId) => {
  try {
    const response = await axiosInstance.get('/projects', {
      params: {
        employeeId: employeeId,
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching projects by employee:', error);
    throw error;
  }
};
