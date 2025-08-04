import GameModel from "../models/GameModel.js";

const GameController = {
  async create(req, res) {
    try {
      const newGame = await GameModel.create(req.body);
      res.status(201).json(newGame);
    } catch (err) {
      res.status(500).json({ message: "The game could not be created." });
    }
  },
  async getItem(req, res) {
    try {
      const gameId = req.params.gameId;
      console.log(gameId);
      const game = await GameModel.findById(req.params.gameId).populate("category");
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
  batchCreate: async (req, res, next) => {
    try {
      const games = await GameModel.create(req.body, {
        ordered: false,
      });

      const savedGames = await GameModel.find({
        _id: { $in: games.map((game) => game._id) },
      });
      res.status(201).json({
        status: "success",
        data: {
          games: savedGames,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  async getItems(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 12;
      const skip = (page - 1) * limit;

      const [games, total] = await Promise.all([
        GameModel.find().skip(skip).limit(limit).populate("category"),
        GameModel.countDocuments(),
      ]);

      res.status(200).json({
        status: "success",
        data: {
          games,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
        },
      });
    } catch (err) {
      res.status(500).json({ message: "Cannot get games." });
    }
  },
};

export default GameController;
