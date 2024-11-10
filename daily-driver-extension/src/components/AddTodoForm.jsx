import { useForm } from "react-hook-form";
import { addTodo } from "../features/todo";
import { useState } from "react";
import { useUser } from "../config/userContext";
import { getTodayDate } from "../utils";
const labelOptions = ["health", "personal", "office"];

function AddTodoForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { taskLabels } = useUser();

  console.log("FROM ADD TODO FORM = ", taskLabels);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    setIsLoading(true);

    if (data.priority === "on") {
      data.priority = "true";
    } else {
      data.priority = "false";
    }

    try {
      const res = await addTodo(data);

      console.log("todo form = ", res);
      if (res.status === 200) {
        reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 p-2">
      <h1 className="text-lg">Add Todo</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col gap-1 min-w-full">
          <label htmlFor="todoName" className="text-sm text-left">
            Task Name
          </label>
          <input
            type="text"
            {...register("todoName")}
            placeholder="Enter your task name"
            className="bg-gray-200 border border-gray-600 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.todoName && (
            <p className="text-xs text-red-500">{errors.todoName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 min-w-full">
          <label htmlFor="todoDescription" className="text-sm text-left">
            Task Description
          </label>
          <input
            type="text"
            {...register("todoDescription")}
            placeholder="Enter your task description"
            className="bg-gray-200 border border-gray-600 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-row justify-between items-center min-w-full">
          <input
            type="date"
            defaultValue={getTodayDate()}
            {...register("dueDate")}
            className="bg-gray-200 border border-gray-600 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            id="label"
            {...register("label", { required: true })}
            className="bg-gray-200 border border-gray-600 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {taskLabels?.map((item) => (
              <option value={item.labelName} key={item._id}>
                {item.labelName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 min-w-full"></div>
        <div className="flex justify-between min-w-full">
          <label htmlFor="priority" className="text-lg text-left">
            Priority
          </label>
          <input
            id="priority"
            type="radio"
            {...register("priority")}
            className="bg-gray-200 border border-gray-600 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          disabled={isLoading}
          className="bg-gray-400 hover:bg-purple-500 rounded-md py-2 mt-2 text-sm font-medium transition-colors"
        >
          {isLoading ? "Please wait ..." : "Save Chnages"}
        </button>
      </form>
    </div>
  );
}

export default AddTodoForm;
