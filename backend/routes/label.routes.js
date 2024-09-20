import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addNewLabel, getLabels } from "../controllers/label.controller.js";

const router = Router();

router.route("/getLabels").get(verifyJWT, getLabels);
router.route("/addNewLabel").post(verifyJWT, addNewLabel);

export default router;
