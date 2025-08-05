import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import gameRoutes from "./routes/gameRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/games", gameRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const MONGO_URI =
  "mongodb+srv://jonatantd2:Anjo7784@cluster1.jib4xys.mongodb.net/gamestore?retryWrites=true&w=majority&appName=Cluster1";
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