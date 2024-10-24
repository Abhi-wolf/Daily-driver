const apiURL = import.meta.env.VITE_BASE_URL;

export async function getExpenses(filter) {
  // console.error(start, end);
  // const filter = "";

  console.log(filter);

  try {
    const res = await fetch(
      `${apiURL}/expense/?startDate=${filter.start}&endDate=${filter.end}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Sends cookies and credentials with the request
      }
    );

    // Check if the response is okay (status 200-299)
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await res.json();

    console.log(data?.data);
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

export async function getExpensesByMonth() {
  try {
    const res = await fetch(`${apiURL}/expense/monthlyExpenses/`, {
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

export async function createExpense({ data }) {
  console.log(data);

  try {
    const res = await fetch(`${apiURL}/expense/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include", // Sends cookies and credentials with the request
    });

    // Check if the response is okay (status 200-299)
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const expense = await res.json();
    return expense?.data;
  } catch (err) {
    console.log(err);
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
}

export async function deleteExpense({ expenseId }) {
  console.log("expenseId = ", expenseId);

  try {
    const res = await fetch(`${apiURL}/expense/${expenseId}`, {
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
    return expenseId;
  } catch (err) {
    console.log(err);
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
}

export async function updateExpense({ expenseId, data }) {
  console.log("expenseId = ", expenseId);
  console.log("data = ", data);

  try {
    const res = await fetch(`${apiURL}/expense/${expenseId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // here projectTasks is an array
      credentials: "include", // Sends cookies and credentials with the request
    });
    // Check if the response is okay (status 200-299)
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }
    const expense = await res.json();
    console.log("expense  update = ", expense);
    return expense?.data;
  } catch (err) {
    console.log(err);
    if (err.response) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
}
