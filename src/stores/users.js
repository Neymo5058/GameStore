// src/stores/users.js
import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("users", {
  state: () => ({
    users: [],
    pagination: { page: 1, limit: 10, totalPages: 0, totalItems: 0 },
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchUsers(page = 1, limit = 10) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get("/api/users", {
          params: { page, limit },
        });
        this.users = response.data.users || [];
        this.pagination =
          response.data.pagination || {
            page,
            limit,
            totalPages: Math.ceil(this.users.length / limit),
            totalItems: this.users.length,
          };
      } catch (err) {
        this.error = err.response?.data?.message || "Failed";
      } finally {
        this.isLoading = false;
      }
    },
    async deleteUser(id) {
      await axios.delete(`/api/users/${id}`);
      this.users = this.users.filter((u) => u._id !== id);
    },
    async updateUserRole(id, role) {
      const res = await axios.put(`/api/users/${id}/role`, { role });
      const index = this.users.findIndex((u) => u._id === id);
      if (index !== -1) {
        this.users[index].role = res.data.user?.role || role;
      }
    },
  },
});
