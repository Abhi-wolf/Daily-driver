import api from "../config/axiosConfig";
import { removeTokens, setTokens } from "../utils";

export async function loginUser(credentials) {
  try {
    const response = await api.post("/user/login", credentials);

    console.log(response);
    const { accessToken, refreshToken } = response?.data?.data;

    console.log("accessToken = ", accessToken);
    console.log("refreshToken = ", refreshToken);

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

// export async function loginUser({ data }) {
//   let userDetail = {};

//   try {
//     const res = await fetch(`http://localhost:5001/api/v1/user/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//       credentials: "include", // Sends cookies and credentials with the request
//     });

//     // Check if the response is okay (status 200-299)
//     if (!res.ok) {
//       const errorData = await res.json();
//       throw new Error(errorData.message || "Login failed");
//     }

//     userDetail = await res.json(); // Parse the response JSON
//     return userDetail?.data;
//   } catch (err) {
//     if (err.response) {
//       console.error(err.response.data.message);
//       throw new Error(err.response.data.message);
//     }
//     throw new Error(err);
//   }
// }
