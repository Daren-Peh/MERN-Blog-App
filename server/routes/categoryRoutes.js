import { Router } from "express";
import { postCategory, getCategories } from "../controllers/categoryController.js";


const router = Router();

router.post("/", postCategory);
router.get("/", getCategories);

export default router;