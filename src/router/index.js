import { createRouter, createWebHistory } from "vue-router";
import SignUpPage from "@/views/SignUpPage.vue";
import Game from "@/views/Game.vue";

const routes = [
  { path: "/signup", name: "SignUp", component: SignUpPage },
  { path: "/game", name: "Game", component: Game },
  { path: "/login", name: "SignUp", component: SignUpPage },
  { path: "/admin/users", name: "", component: SignUpPage },
  { path: "/admin/users/add", name: "", component: SignUpPage },
  { path: "/admin/items", name: "", component: SignUpPage },
  { path: "/admin/items/add", name: "", component: SignUpPage },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
