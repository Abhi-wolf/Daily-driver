import { Router } from "express";
import {
  addProject,
  deleteProject,
  getProject,
  getProjects,
} from "../controllers/project.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addProject").post(verifyJWT, addProject);
router.route("/getProjects").get(verifyJWT, getProjects);
router.route("/:projectId").get(verifyJWT, getProject);
router.route("/:projectId").post(verifyJWT, deleteProject);

export default router;
