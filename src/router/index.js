import { createRouter, createWebHistory } from "vue-router";
import SignUpPage from "@/views/SignUpPage.vue";
import Game from "@/views/Game.vue";
import HomePage from "@/views/HomePage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/signup", name: "SignUp", component: SignUpPage },
  { path: "/login", name: "Login", component: SignUpPage },

  { path: "/games/:id", name: "GameDetail", component: Game },
  { path: "/admin/users", name: "AdminUsers", component: SignUpPage },
  { path: "/admin/users/add", name: "AdminAddUser", component: SignUpPage },
  { path: "/admin/items", name: "AdminItems", component: SignUpPage },
  { path: "/admin/item/add", name: "AdminAddItem", component: SignUpPage },
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
