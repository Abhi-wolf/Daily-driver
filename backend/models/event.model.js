import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: [true, "Event name is required"],
  },
  eventDescription: {
    type: String,
    default: "",
  },
  eventDate: {
    type: Date,
    default: Date.now(),
  },
});

export const Event = mongoose.model("Event", eventSchema);
