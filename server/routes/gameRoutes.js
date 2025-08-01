import express from "express";
import GameController from "../controllers/gameController.js";

const router = express.Router();

router.post("/", GameController.create);
router.get("/:gameId", GameController.getItem);
router.post("/batchCreate", GameController.batchCreate);
router.get("/", GameController.getItems);
export default router;
