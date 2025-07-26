import { createRouter, createWebHistory } from "vue-router";
import SignUpPage from "@/views/SignUpPage.vue";

const routes = [{ path: "/signup", name: "SignUp", component: SignUpPage }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
