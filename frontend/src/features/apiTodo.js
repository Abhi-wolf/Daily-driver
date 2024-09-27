const apiURL = import.meta.env.VITE_BASE_URL;

export async function getUserTodos(filter) {
  try {
    const res = await fetch(`${apiURL}/todos?filter=${filter}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Sends cookies and credentials with the request
    });

    // Check if the response is okay (status 200-299)
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await res.json();
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

export async function createTodo({ newTodo }) {
  console.log(newTodo);

  try {
    const res = await fetch(`${apiURL}/todos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
      credentials: "include", // Sends cookies and credentials with the request
    });

    // Check if the response is okay (status 200-299)
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await res.json();
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

export async function deleteTodo({ todoId }) {
  console.log("todoId = ", todoId);

  try {
    const res = await fetch(`${apiURL}/todos/${todoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Sends cookies and credentials with the request
    });
    // Check if the response is okay (status 200-299)
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }
    const data = await res.json();
    console.log("project data delete = ", data);
    return todoId;
  } catch (err) {
    console.log(err);
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
}

export async function updateTodo({ todoId, newTodo }) {
  console.log("todoId = ", todoId);
  console.log("newTodo = ", newTodo);

  try {
    const res = await fetch(`${apiURL}/todos/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo), // here projectTasks is an array
      credentials: "include", // Sends cookies and credentials with the request
    });
    // Check if the response is okay (status 200-299)
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }
    const data = await res.json();
    console.log("event  update = ", data);
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

export async function updateTodoStatus({ todoId, done }) {
  console.log("todoId = ", todoId);
  console.log("done = ", done);

  try {
    const res = await fetch(`${apiURL}/todos/statusupdate/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done: done }), // here projectTasks is an array
      credentials: "include", // Sends cookies and credentials with the request
    });
    // Check if the response is okay (status 200-299)
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }
    const data = await res.json();
    console.log("event  update = ", data);
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
