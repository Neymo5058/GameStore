import { createRouter, createWebHistory } from "vue-router";
import SignUpPage from "@/views/SignUpPage.vue";
import Game from "@/views/Game.vue";

const routes = [
  { path: "/signup", name: "SignUp", component: SignUpPage },
  {
    path: "/games/:id",
    name: "Game",
    component: () => import("../views/Game.vue"),
  },
  { path: "/login", name: "SignUp", component: SignUpPage },
  { path: "/admin/users", name: "", component: SignUpPage },
  { path: "/admin/users/add", name: "", component: SignUpPage },
  { path: "/admin/items", name: "", component: SignUpPage },
  { path: "/admin/item/add", name: "", component: SignUpPage },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
