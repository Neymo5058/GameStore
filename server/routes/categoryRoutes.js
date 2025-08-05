// categoryRoutes.js
import express from "express";
import CategoryController from "../controllers/categoryController.js";
import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();


router.get("/", CategoryController.getItems);
router.post("/", auth, authorize('admin', 'manager'), CategoryController.create);


export default router;
