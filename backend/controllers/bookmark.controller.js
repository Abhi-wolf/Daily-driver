import { Bookmark } from "../models/bookmark.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addNewBookmarkLabel = asyncHandler(async (req, res) => {
  const { bookmarkLabelName } = req.body;

  if (!bookmarkLabelName) {
    throw new ApiError(400, "Name of the bookmark  is required");
  }

  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(400, "Unauthorized access");
  }

  const user = await User.findById(userId); // Assume req.user contains the authenticated user
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const newLabel = { bookmarkLabelName };

  try {
    user.bookmarkLabelName.push(newLabel);
    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, "Label successfully created"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Internal error"));
  }
});

const addBookmark = asyncHandler(async (req, res) => {
  console.log("addBookmark = ", req.body);
  const { link, bookmarkLabel } = req.body;

  if (!link) {
    throw new ApiError(400, "Link  is required");
  }

  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(400, "Unauthorized access");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const oldbookmark = await Bookmark.find({ createdBy: userId, link });

  if (oldbookmark) {
    throw new ApiError(409, "Link is already bookmarked");
  }

  try {
    const newbookmark = await Bookmark.create({
      createdBy: userId,
      link,
      bookmarkLabel,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, newbookmark, "Bookmarked successfully "));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Internal error"));
  }
});

const getBookmarkLabels = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(400, "Unauthorized access");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const bookmarkLabels = user.bookmarkLabelName;

  return res
    .status(200)
    .json(new ApiResponse(200, bookmarkLabels, "User bookmark labels"));
});

const deleteBookmarkLabel = asyncHandler(async (req, res) => {
  const { bookmarkLabelId } = req.params;
  const userId = req.user._id;

  if (!bookmarkLabelId) {
    throw new ApiError(400, "Label Id is required");
  }

  const user = await User.findById(userId).select("labels");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const labelIndex = user.bookmarkLabels.findIndex((l) =>
    l._id.equals(bookmarkLabelId)
  );

  if (labelIndex == -1) {
    throw new ApiError(400, "Label not found");
  }

  try {
    user.bookmarkLabels.splice(labelIndex, 1);
    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, "Label deleted successfully"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Internal error"));
  }
});

export {
  addNewBookmarkLabel,
  getBookmarkLabels,
  deleteBookmarkLabel,
  addBookmark,
};
