import { defineStore } from "pinia";
import axios from "axios";

export const useGameStore = defineStore("games", {
  state: () => ({
    games: [],
    currentPage: 1,
    totalPages: 1,
    pagination: { page: 1, limit: 10, totalPages: 1, totalItems: 0 },
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchGames(page = 1, limit = 10) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get("/api/games", { params: { page, limit } });
        const data = response.data.data || {};
        this.games = data.games || [];
        const pagination = response.data.pagination || {
          page: data.currentPage || page,
          limit,
          totalPages: data.totalPages || Math.ceil(this.games.length / limit),
          totalItems: data.totalItems || this.games.length,
        };
        this.pagination = pagination;
        this.currentPage = pagination.page;
        this.totalPages = pagination.totalPages;
      } catch (err) {
        console.error("Erreur fetch games:", err);
        this.error = err.response?.data?.message || "Failed";
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
          (response.data.data && response.data.data.game) || response.data.game || response.data;
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
          (response.data.data && response.data.data.game) || response.data.game || response.data;
        const index = this.games.findIndex((game) => game._id === id || game.id === id);
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
        this.games = this.games.filter((game) => game._id !== id && game.id !== id);
      } catch (err) {
        this.error = err.response?.data?.message || "Failed";
        throw err;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
