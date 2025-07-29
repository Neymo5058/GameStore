import express from "express";
import GameController from "../controllers/gameController.js";

const router = express.Router();

router.post("/", GameController.create);
router.get("/:gameId", GameController.getItem);

export default router;
