import { createRouter, createWebHistory } from "vue-router";
import SignUpPage from "@/views/SignUpPage.vue";
import Game from "@/views/Game.vue";

const routes = [
  { path: "/signup", name: "SignUp", component: SignUpPage },
  { path: "/game", name: "Game", component: Game },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
