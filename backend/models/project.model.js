import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: [true, "Project name is required"],
    },
    projectDescription: {
      type: String,
      default: "",
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
          required: [true, "Task status is required"],
          enum: {
            values: ["backlog", "todo", "doing", "done"],
          },
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model("Project", projectSchema);
