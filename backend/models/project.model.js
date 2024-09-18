import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: [true, "Project name is required"],
    },
    projectDescription: {
      type: String,
    },
    projectTasks: [
      {
        taskName: {
          type: String,
          required: [true, "Task name is required"],
        },
        taskDescription: {
          type: String,
        },
        taskStatus: {
          type: String,
          default: "todo",
          enum: {
            values: ["todo", "in-progress", "completed"],
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model("Project", projectSchema);
