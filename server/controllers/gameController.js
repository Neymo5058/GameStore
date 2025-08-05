import GameModel from "../models/gameModel.js";
import CategoryModel from "../models/categoryModel.js";
import mongoose from "mongoose";

async function formatCategory(category) {
  if (!category) return [];
  const categories = Array.isArray(category) ? category : [category];
  const ids = [];
  for (const cat of categories) {
    if (mongoose.Types.ObjectId.isValid(cat)) {
      ids.push(cat);
    } else if (typeof cat === "string" && cat.trim()) {
      let existing = await CategoryModel.findOne({ name: cat });
      if (!existing) {
        existing = await CategoryModel.create({ name: cat });
      }
      ids.push(existing._id);
    }
  }
  return ids;
}

const GameController = {
  async create(req, res, next) {
    try {
      const { category, image, imageUrl, gallery, ...rest } = req.body;
      const formattedCategory = await formatCategory(category);
      const img = imageUrl || image;
      if (!formattedCategory.length || !img) {
        return res.status(400).json({ message: "Category ID(s) and imageUrl are required." });
      }
      const newGame = await GameModel.create({
        ...rest,
        category: formattedCategory,
        imageUrl: img,
        gallery: gallery || [],
      });
      res.status(201).json(newGame);
    } catch (err) {
      next(err);
    }
  },
  async getItem(req, res, next) {
    try {
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
      next(err);
    }
  },

  async deleteItem(req, res, next) {
    try {
      const game = await GameModel.findByIdAndDelete(req.params.gameId);
      if (!game) {
        return res.status(404).json({
          status: "fail",
          message: "Game not found",
        });
      }
      res.status(200).json({
        status: "success",
        message: "Game deleted",
      });
    } catch (err) {
      next(err);
    }
  },
  async update(req, res, next) {
    try {
      const { gameId } = req.params;
      const { category, image, imageUrl, gallery, ...rest } = req.body;

      const updateData = { ...rest };
      if (category) {
        const formattedCategory = await formatCategory(category);
        updateData.category = formattedCategory;
      }

      const img = imageUrl || image;
      if (img) {
        updateData.imageUrl = img;
      }

      if (gallery) {
        updateData.gallery = gallery;
      }

      const updatedGame = await GameModel.findByIdAndUpdate(gameId, updateData, {
        new: true,
      }).populate("category");

      if (!updatedGame) {
        return res.status(404).json({ message: "Game not found" });
      }

      res.status(200).json(updatedGame);
    } catch (err) {
      next(err);
    }
  },
  async delete(req, res, next) {
    try {
      const { gameId } = req.params;
      const deleted = await GameModel.findByIdAndDelete(gameId);
      if (!deleted) {
        return res.status(404).json({ message: "Game not found" });
      }
      res.status(200).json({ message: "Game deleted" });
    } catch (err) {
      next(err);
    }
  },
  batchCreate: async (req, res, next) => {
    try {
      const formattedPayload = await Promise.all(
        req.body.map(async (game) => {
          const { category, image, imageUrl, gallery, ...rest } = game;
          const img = imageUrl || image;
          return {
            ...rest,
            category: await formatCategory(category),
            imageUrl: img,
            gallery: gallery || [],
          };
        })
      );

      const games = await GameModel.create(formattedPayload, {
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
  async getItems(req, res, next) {
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
        data: { games },
        pagination: {
          totalItems,
          totalPages: Math.ceil(totalItems / limit),
          page,
          limit,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};

export default GameController;
