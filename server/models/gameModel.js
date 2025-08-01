import mongoose from "mongoose";

const GameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A game must have a title"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "A game must have a price"],
      min: 0,
    },
    reviews: {
      type: Number,
      required: false,
    },
    platform: {
      type: String,
      enum: ["PC", "PS5", "Xbox", "Switch"],
      required: [true, "A game must have a platform"],
    },
    releaseDate: {
      type: String,
      required: false,
    },
    developer: {
      type: String,
      required: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "A game must have a category"],
    },
    imageUrl: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const GameModel = mongoose.model("Game", GameSchema);
export default GameModel;
