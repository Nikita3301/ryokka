import axiosInstance from "src/axiosConfig";

const API_BASE_URL = 'http://localhost:8080/api/invoices'; 

export const getAllInvoices = async () => {
  try {
    const response = await axiosInstance.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
};

export const getInvoiceById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching invoice with ID ${id}:`, error);
    throw error;
  }
};

export const getInvoicesByProjectId = async (projectId) => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching invoices for project ID ${projectId}:`, error);
    throw error;
  }
};

export const createInvoice = async (invoice) => {
  try {
    const response = await axiosInstance.post(API_BASE_URL, invoice);
    return response.data;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
};

export const updateInvoice = async (id, invoice) => {
  try {
    const response = await axiosInstance.put(`${API_BASE_URL}/${id}`, invoice);
    return response.data;
  } catch (error) {
    console.error(`Error updating invoice with ID ${id}:`, error);
    throw error;
  }
};

export const deleteInvoice = async (id) => {
  try {
    await axiosInstance.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting invoice with ID ${id}:`, error);
    throw error;
  }
};
