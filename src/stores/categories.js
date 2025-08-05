// src/stores/categories.js
import { defineStore } from "pinia";
import axios from "axios";

export const useCategoryStore = defineStore("categories", {
  state: () => ({
    categories: [],
    pagination: { page: 1, limit: 10, totalPages: 0, totalItems: 0 },
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchCategories(page = 1, limit = 10) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get("/api/categories", {
          params: { page, limit },
        });
        this.categories =
          (response.data.data && response.data.data.categories) ||
          response.data.categories ||
          response.data ||
          [];
        this.pagination =
          response.data.pagination || {
            page,
            limit,
            totalPages: Math.ceil(this.categories.length / limit),
            totalItems: this.categories.length,
          };
      } catch (err) {
        this.error = err.response?.data?.message || "Failed";
      } finally {
        this.isLoading = false;
      }
    },
  },
});
