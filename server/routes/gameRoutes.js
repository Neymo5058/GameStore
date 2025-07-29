import express from "express";
import GameController from "../controllers/gameController.js";

const router = express.Router();

router.post("/", GameController.create);
router.get("/:gameId", GameController.getItem);
router.get("/test", (req, res) => {
  res.send("Game test route OK");
});

export default router;
