import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addNewLabel = asyncHandler(async (req, res) => {
  const { labelName } = req.body;
  console.log(req.body);

  if (!labelName) {
    throw new ApiError(400, "Name of the label is required");
  }

  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(400, "Unauthorized access");
  }

  const user = await User.findById(userId); // Assume req.user contains the authenticated user
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const newLabel = { labelName };

  try {
    user.labels.push(newLabel);
    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, "Label successfully created"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Internal error"));
  }
});

const getLabels = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(400, "Unauthorized access");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const labels = user.labels;

  return res.status(200).json(new ApiResponse(200, labels, "User events"));
});

export { addNewLabel, getLabels };
