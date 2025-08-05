// src/stores/games.js
import { defineStore } from "pinia";
import axios from "axios";

export const useGameStore = defineStore("games", {
  state: () => ({
<<<<<<< Updated upstream
    games: ref([]),
    currentPage: 1,
    totalPages: 3,
=======
    games: [],
    pagination: { page: 1, limit: 10, totalPages: 0, totalItems: 0 },
>>>>>>> Stashed changes
    isLoading: false,
  }),
  actions: {
<<<<<<< Updated upstream
    async fetchGames(page = 1) {
=======
    async fetchGames(page = 1, limit = 10) {
>>>>>>> Stashed changes
      this.isLoading = true;
      try {
<<<<<<< Updated upstream
        const response = await axios.get(`/api/games?page=${page}&limit=12`);
        this.games = response.data.data.games;
        this.currentPage = response.data.data.currentPage;
        this.totalPages = response.data.data.totalPages;
=======
        const response = await axios.get("/api/games", {
          params: { page, limit },
        });
        this.games =
          (response.data.data && response.data.data.games) ||
          response.data.games ||
          response.data ||
          [];

        this.pagination =
          response.data.pagination || {
            page,
            limit,
            totalPages: Math.ceil(this.games.length / limit),
            totalItems: this.games.length,
          };

>>>>>>> Stashed changes
      } catch (err) {
        console.error("Erreur fetch games:", err);
      } finally {
        this.isLoading = false;
      }
    },
    getGameById(id) {
      return this.games.find((game) => game._id === id || game.id === id);
    },
    async addGame(game) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.post("/api/games", game);
        const created =
          (response.data.data && response.data.data.game) ||
          response.data.game ||
          response.data;
        this.games.push(created);
        return created;
      } catch (err) {
        this.error = err.response?.data?.message || "Failed";
        throw err;
      } finally {
        this.isLoading = false;
      }
    },
    async updateGame(id, payload) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.put(`/api/games/${id}`, payload);
        const updated =
          (response.data.data && response.data.data.game) ||
          response.data.game ||
          response.data;
        const index = this.games.findIndex(
          (game) => game._id === id || game.id === id
        );
        if (index !== -1) {
          this.games[index] = { ...this.games[index], ...updated };
        }
        return updated;
      } catch (err) {
        this.error = err.response?.data?.message || "Failed";
        throw err;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteGame(id) {
      this.isLoading = true;
      this.error = null;
      try {
        await axios.delete(`/api/games/${id}`);
        this.games = this.games.filter(
          (game) => game._id !== id && game.id !== id
        );
      } catch (err) {
        this.error = err.response?.data?.message || "Failed";
        throw err;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
