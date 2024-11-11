import api from "../config/axiosConfig";
import { removeTokens, setTokens } from "../utils";

export async function loginUser(credentials) {
  try {
    const response = await api.post("/user/login", credentials);

    const { accessToken, refreshToken } = response?.data?.data;

    await setTokens(accessToken, refreshToken);

    return response?.data?.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Login Failed:", error.response.data.message);
      throw error.response.data.message;
    } else {
      // Network or other error
      console.error("Login Failed: Network Error");
    }

    throw error;
  }
}

export async function logoutUser() {
  try {
    await removeTokens();
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Login Failed:", error.response.data.message);
      throw error.response.data.message;
    } else {
      // Network or other error
      console.error("Login Failed: Network Error");
    }

    throw error;
  }
}
