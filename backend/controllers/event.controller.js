import { Event } from "../models/event.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addEvent = asyncHandler(async (req, res) => {
  const { eventName, eventDescription, eventDate } = req.body;

  if (!eventName || !eventDate) {
    throw new ApiError(400, "All fields are required");
  }

  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(400, "Unauthorized access");
  }

  const user = await User.findById(userId); // Assume req.user contains the authenticated user
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  try {
    const event = await Event.create({
      eventName,
      eventDescription,
      eventDate,
      createdBy: userId,
    });

    user.events.push(event._id);
    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, event, "Event successfully registered"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Internal error"));
  }
});

const getUserEvents = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).populate("events"); // Populate to get event details

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const events = user.events;

  return res.status(200).json(new ApiResponse(200, events, "User events"));
});

export { addEvent, getUserEvents };
