import { Router } from "express";
import { 
    loginController,
    logoutController,
    refreshAccessTokenController,
    registerController,

       } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddlerware.js";

const router = Router();

router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.route("/refresh-token").post(refreshAccessTokenController);

router.use(authMiddleware);

router.route("logout").get(logoutController);

export default router;