import express from "express";
import { getUserProfile, login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/authMiddlerware.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

router.use(isAuthenticated);

router.route("/profile").get(getUserProfile);
router.route("/profile/update").put(upload.single("profilePhoto"), updateProfile);

export default router;