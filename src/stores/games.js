import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useGameStore = defineStore("games", {
  state: () => ({
    games: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchGames() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get("/api/games");
        this.games = response.data.data.games || [];
      } catch (err) {
        this.error = err.response?.data?.message || "Failed";
      } finally {
        this.isLoading = false;
      }
    },
    getGameById(id) {
      return this.games.find((game) => game._id === id);
    },
  },
});
