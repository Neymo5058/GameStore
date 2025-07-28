import mongoose from "mongoose";

const GameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A game must have a title"],
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "A game must have a price"],
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    platform: {
      type: String,
      enum: ["PC", "PS5", "Xbox", "Switch"],
      required: [true, "A game must have a platform"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "A game must have a category"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    imageUrl: {
      type: String,
      required: true,
    },
    languages: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const GameModel = mongoose.model("Game", GameSchema);
export default GameModel;
