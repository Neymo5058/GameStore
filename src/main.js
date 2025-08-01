import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount("#app");

const STORAGE_KEY = "gamestore_games";

window.addEventListener("storage", (e) => {
  if (e.key === STORAGE_KEY) {
    try {
      const newGames = JSON.parse(e.newValue);
      if (newGames) {
        const { useGameStore } = require("./stores/gameStore.js");
        const store = useGameStore(pinia);
        store.games = newGames;
      }
    } catch (err) {
      console.error("Erreur de synchro entre onglets:", err);
    }
  }
});
