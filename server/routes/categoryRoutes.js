// categoryRoutes.js
import express from "express";
import CategoryController from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", CategoryController.create);

export default router;
