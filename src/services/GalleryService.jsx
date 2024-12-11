import axiosInstance from "src/axiosConfig";

const API_BASE_URL = "http://localhost:8080/api/project-images";

export const getAllProjectImages = async () => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getProjectImagesById = async (projectId) => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
export const setMainImage = async (imageId, projectId) => {
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/${imageId}/main?projectId=${projectId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error setting main image:", error);
    throw error;
  }
};

export const uploadImages = async (formData, projectId) => {
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/${projectId}/uploadImages`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};

export const deleteImageById = async (imageId) => {
  try {
    const response = await axiosInstance.delete(`${API_BASE_URL}/images/${imageId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting:", error);
    throw error;
  }
};


