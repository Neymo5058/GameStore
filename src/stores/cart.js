// src/stores/cart.js
import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    isLoading: false,
  }),
  getters: {
    totalItems: (state) => state.items.length,
    totalPrice: (state) =>
      state.items.reduce((sum, item) => sum + (Number(item.price) || 0), 0),
  },
  actions: {
    add(game) {
      if (!this.items.find((g) => g._id === game._id)) {
        this.items.push(game);
        this.persist();
      }
    },
    remove(id) {
      this.items = this.items.filter((g) => g._id !== id);
      this.persist();
    },
    clear() {
      this.items = [];
      this.persist();
    },
    reset() {
      localStorage.removeItem(this.getStorageKey());
      this.items = [];
    },
    getStorageKey() {
      const auth = useAuthStore();
      // Use a key scoped to the current user so carts remain private.
      return `gamestore_cart_${auth.user?._id || "guest"}`;
    },
    persist() {
      localStorage.setItem(this.getStorageKey(), JSON.stringify(this.items));
    },
    async refresh() {
      this.isLoading = true;
      const updated = [];
      for (const item of this.items) {
        try {
          const response = await axios.get(`/api/games/${item._id}`);
          const game =
            (response.data.data && response.data.data.game) ||
            response.data.game ||
            response.data;
          updated.push(game);
        } catch (e) {
          // If the request fails, retain the existing item
          console.error("Failed to refresh cart item", e);
          updated.push(item);
        }
      }
      this.items = updated;
      this.persist();
      this.isLoading = false;
    },
    async restore() {
      this.isLoading = true;
      const raw = localStorage.getItem(this.getStorageKey());
      if (raw) {
        try {
          this.items = JSON.parse(raw);
        } catch (e) {
          this.items = [];
        }
      } else {
        this.items = [];
      }
      await this.refresh();
      this.isLoading = false;
    },
  },
});
