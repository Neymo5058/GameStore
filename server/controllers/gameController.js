import GameModel from "../models/GameModel.js";

const GameController = {
  async create(req, res) {
    try {
      const newGame = await GameModel.create(req.body);
      res.status(201).json(newGame);
    } catch (err) {
      // console.error(err);
      res.status(500).json({ message: "The game could not be created." });
    }
  },
  async getItem(req, res) {
    try {
      const gameId = req.params.gameId;
      console.log(gameId);
      const game = await GameModel.findById(req.params.gameId);
      if (!game) {
        return res.status(404).json({
          status: "fail",
          message: "Game not found",
        });
      }
      res.status(200).json({
        status: "success",
        message: `Game found`,
        data: { game },
      });
    } catch (err) {
      res.status(500).json({ message: "Can not get this game" });
    }
  },
};

export default GameController;
