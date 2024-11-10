import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addBookmark,
  addNewBookmarkLabel,
  deleteBookmarkLabel,
  getBookmarkLabels,
} from "../controllers/bookmark.controller.js";

const router = Router();

router.route("/").get(verifyJWT, getBookmarkLabels);
router.route("/addBookMarkLabel").post(verifyJWT, addNewBookmarkLabel);
router.route("/").post(verifyJWT, addBookmark);
router.route("/:id").delete(verifyJWT, deleteBookmarkLabel);

export default router;
