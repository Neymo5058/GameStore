import fs from "fs";
import path from "path";
import Game from "../models/Game.js";

export function loadGamesFromFile() {
  const filePath = path.resolve("server/templates/gamesTemplate.json");

  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(data);
    return parsed.map((gameObj) => new Game(gameObj));
  } catch (err) {
    console.error("Error reading JSON file:", err);
    return [];
  }
}
