import { Router } from "express";
import { createPost, updatePost, deletePost, getPost, getPosts } from "../controllers/postController.js";
const router = Router();
import protect from "../middleware/authMiddleware.js";

router.post("/upload", createPost);

router.put("/:id", protect, updatePost);

router.delete("/:id", protect, deletePost);

router.route("/:id").get(getPost);

router.get("/", getPosts);





export default router;