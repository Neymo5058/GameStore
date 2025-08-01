// src/store/cartStore.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []  // { gameId, quantity }
  }),
  actions: {
    add(gameId) {
      const item = this.items.find(i => i.gameId === gameId);
      if (item) item.quantity++;
      else this.items.push({ gameId, quantity: 1 });
    },
    remove(gameId) {
      this.items = this.items.filter(i => i.gameId !== gameId);
    },
    clear() {
      this.items = [];
    }
  }
});
