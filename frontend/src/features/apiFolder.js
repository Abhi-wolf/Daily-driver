const apiURL = import.meta.env.VITE_BASE_URL;

export async function getFolders() {
  try {
    const res = await fetch(`${apiURL}/folders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    // console.log(res);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await res.json();
    console.log(data);
    return data?.data;
  } catch (err) {
    console.log(err);
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
}
export async function getFolder(folderId) {
  try {
    const res = await fetch(`${apiURL}/folders/${folderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    // console.log(res);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await res.json();
    console.log(data);
    return data?.data;
  } catch (err) {
    console.log(err);
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
}

export async function createNewFolder({ newData }) {
  try {
    const res = await fetch(`${apiURL}/folders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
      credentials: "include",
    });

    // console.log(res);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await res.json();
    console.log(data);
    return data?.data;
  } catch (err) {
    console.log(err);
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
}

export async function renameFolder({ newName, folderId }) {
  console.log("newName = ", newName);
  console.log("folderId = ", folderId);

  try {
    const res = await fetch(`${apiURL}/folders/${folderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newName }),
      credentials: "include",
    });

    // console.log(res);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await res.json();
    console.log(data);
    return data?.data;
  } catch (err) {
    console.log(err);
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
}

export async function deleteFolder({ folderId }) {
  try {
    const res = await fetch(`${apiURL}/folders/${folderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }
    const data = await res.json();
    console.log(data);
    return data?.data;
  } catch (err) {
    console.log(err);
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
}
