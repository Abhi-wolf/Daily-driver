import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  link: {
    type: String,
    required: [true, "Bookmark Link is required"],
  },
  bookmarkLabel: {
    type: String,
    default: "bookmarks",
  },
});

export const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
