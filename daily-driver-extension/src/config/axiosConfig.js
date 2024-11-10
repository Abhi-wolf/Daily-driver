import axios from "axios";
import { getTokens } from "../utils";

const api = axios.create({
  baseURL: "http://localhost:5001/api/v1", // Replace with your API URL
  headers: {
    "Content-Type": "application/json",
    // Add other default headers if needed
  },
});

// Optional: Add interceptors for requests and responses
api.interceptors.request.use(
  async (config) => {
    const tokens = await getTokens();
    if (tokens.accessToken) {
      config.headers["Authorization"] = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response errors (like unauthorized access)
    return Promise.reject(error);
  }
);

export default api;
