import api from "../config/axiosConfig";

export async function addTodo(data) {
  console.info("ADDING TODO");
  try {
    const response = await api.post("/todos", data);

    return response;
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

export async function addBookMark(data) {
  try {
    const response = await api.post("/bookmarks", data);
    console.log(response);
    return response;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Bookmark Failed:", error.response.data.message);
      throw error.response.data.message;
    } else {
      // Network or other error
      console.error("Bookmark Failed: Network Error");
    }

    throw error;
  }
}
