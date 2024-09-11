import axiosInstance from "src/axiosConfig";

const API_BASE_URL = 'http://localhost:8080/api/employees'; 



export const getAllEmployees = async () => {
  try {
    const response = await axiosInstance.get(API_BASE_URL);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};


export const getEmployeeById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    throw error;
  }
};




// class ProjectTeamService {
//     // Fetch all employees
//     getEmployees() {
//       return axiosInstance.get('/employees');
//     }
  
//     // Create a new employee
//     createEmployee(employeeData) {
//       return axiosInstance.post('/employees', employeeData);
//     }
  
//     // Get an employee by ID
//     getEmployeeById(id) {
//       return axiosInstance.get(`/employees/${id}`);
//     }
  
//     // Update an employee
//     updateEmployee(id, employeeData) {
//       return axiosInstance.put(`/employees/${id}`, employeeData);
//     }
  
//     // Delete an employee
//     deleteEmployee(id) {
//       return axiosInstance.delete(`/employees/${id}`);
//     }
// }

