import axios from "axios";

// Create axios instance with default config
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("authToken");

    // If token exists, add it to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx will trigger this function
    return response.data;
  },
  (error) => {
    // Any status codes outside the range of 2xx will trigger this function

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem("authToken");
          window.location.href = "/login";
          break;

        case 403:
          // Forbidden
          console.error("Access forbidden");
          break;

        case 404:
          // Not found
          console.error("Resource not found");
          break;

        case 422:
          // Unprocessable entity
          console.error("Unprocessable entity");
          break;

        case 500:
          // Server error
          console.error("Server error");
          break;

        default:
          console.error("An error occurred:", error.response.data);
      }

      return Promise.reject(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      return Promise.reject({ message: "No response from server" });
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

// Helper methods for common HTTP methods
export const apiClient = {
  get: (url, config = {}) => axiosClient.get(url, config),

  post: (url, data, config = {}) => axiosClient.post(url, data, config),

  put: (url, data, config = {}) => axiosClient.put(url, data, config),

  patch: (url, data, config = {}) => axiosClient.patch(url, data, config),

  delete: (url, config = {}) => axiosClient.delete(url, config),
};

export default axiosClient;
