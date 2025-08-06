import express from "express";
import GameController from "../controllers/gameController.js";
import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

router.post("/", auth, authorize("admin", "manager"), GameController.create);
router.get("/:gameId", GameController.getItem);
router.delete("/:gameId", auth, authorize("admin", "manager"), GameController.deleteItem);
router.post("/batchCreate", auth, authorize("admin", "manager"), GameController.batchCreate);
router.get("/", GameController.getItems);
router.put("/:gameId", auth, authorize("admin", "manager"), GameController.update);
export default router;
