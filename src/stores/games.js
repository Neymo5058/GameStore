import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useGameStore = defineStore("games", {
  state: () => ({
    games: ref([]),
    currentPage: 1,
    totalPages: 3,
    isLoading: false,
  }),
  actions: {
    async fetchGames(page = 1) {
      this.isLoading = true;
      try {
        const response = await axios.get(`/api/games?page=${page}&limit=12`);
        this.games = response.data.data.games;
        this.currentPage = response.data.data.currentPage;
        this.totalPages = response.data.data.totalPages;
      } catch (err) {
        console.error("Erreur fetch games:", err);
      } finally {
        this.isLoading = false;
      }
    },
    getGameById(id) {
      return this.games.find((game) => game._id === id);
    },
  },
});
