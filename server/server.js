import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import gameRoutes from "./routes/gameRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/games", gameRoutes);
app.use("/api/categories", categoryRoutes);

const MONGO_URI =
  "mongodb+srv://Sami5058:12345678%24@cluster1.jib4xys.mongodb.net/gamestore?retryWrites=true&w=majority&appName=Cluster1";
const PORT = 4000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(" Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(` Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
  });
