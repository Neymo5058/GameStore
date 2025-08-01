import { createRouter, createWebHistory } from "vue-router";
import SignUpPage from "@/views/SignUpPage.vue";
import Game from "@/views/Game.vue";
import HomePage from "@/views/HomePage.vue";

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
  {
    path: "/",

    component: HomePage,
  },
  {
    path: "/",
    component: HomePage,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    return { top: 0 };
  },
});

export default router;
