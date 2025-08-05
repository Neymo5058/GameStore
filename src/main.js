import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "./stores/authStore"; // <--- Import your store!
import "./style.css";
import i18n from "./i18n";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(i18n);

// Restore user session on startup (after Pinia is used!)
const auth = useAuthStore();
auth.restore();

app.mount("#app");
