import { Router } from "express";
import { addEvent, getUserEvents } from "../controllers/event.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addEvent").post(verifyJWT, addEvent);
router.route("/getUserEvents").get(verifyJWT, getUserEvents);

export default router;
