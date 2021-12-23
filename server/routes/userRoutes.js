import express, { Router } from "express";
import { authUser, loginUser, registerUser, updateUser, deleteUser, getUserProfile } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";


const router = Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);


export default router;