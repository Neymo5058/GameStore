import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
const games = ref([]);

export const usegameStore = defineStore("game", () => {
  const games = ref([]);
});
