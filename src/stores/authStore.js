// src/stores/authStore.js
import { defineStore } from "pinia";
import axios from "axios";
import { useCartStore } from "./cart";

axios.defaults.withCredentials = true;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    role: null,
    isLoading: false,
  }),
  actions: {
    async login(credentials) {
      this.isLoading = true;
      try {
        const { data } = await axios.post("/api/auth/login", credentials);
        const cart = useCartStore();
        cart.reset();
        this.user = data.user;
        this.role = data.user.role;
        cart.restore();
      } finally {
        this.isLoading = false;
      }
    },

    async fetchUser() {
      this.isLoading = true;
      // You may want to implement fetchUser logic here
    },

    async restore() {
      this.isLoading = true;
      const cart = useCartStore();
      cart.reset();
      try {
        const { data } = await axios.get("/api/auth/me");
        this.user = data.user;
        this.role = data.user.role;
      } catch {
        this.user = null;
        this.role = null;
      } finally {
        cart.restore();
        this.isLoading = false;
      }
    },

    async logout(router) {
      this.isLoading = true;
      try {
        await axios.post("/api/auth/logout");
        const cart = useCartStore();
        cart.reset();
        this.user = null;
        this.role = null;
        cart.restore();
        if (router) router.push("/");
      } finally {
        this.isLoading = false;
      }
    },
  },
});
