
import { createRouter, createWebHistory } from "vue-router";
import SignUpPage from "../views/SignUpPage.vue";
import SignInPage from "../views/SignInPage.vue";
import Game from "../views/Game.vue";
import HomePage from "../views/HomePage.vue";
import Cart from "../views/Cart.vue";
import ManagerProducts from "../views/Manager/ManagerProducts.vue";
import AddProduct from "../views/Manager/AddProduct.vue";
import ManagerUsers from "../views/Manager/ManagerUsers.vue";
import { useAuthStore } from "../stores/authStore";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/signup", name: "SignUp", component: SignUpPage },
  { path: "/login", name: "Login", component: SignInPage },
  { path: "/games/:id", name: "GameDetail", component: Game },
  { path: "/cart", name: "Cart", component: Cart },
  { path: "/manager", name: "ManagerProducts", component: ManagerProducts },
  {
    path: "/manager/add/:id?",
    name: "AddProduct",
    component: AddProduct,
  },
  { path: "/admin", name: "UserManagement", component: ManagerUsers },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();
  await auth.restore();

  const userRole = auth.user?.role || auth.role;

  // If user is admin/manager, redirect "/" to /manager
  if (to.path === "/" && ["admin", "manager"].includes(userRole)) {
    return next("/manager");
  }

  // If user is NOT admin/manager, prevent access to /manager
  if (
    to.path.startsWith("/manager") &&
    (!userRole || !["admin", "manager"].includes(userRole))
  ) {
    return next("/"); // Redirect them to store
  }

  // If user is NOT admin, prevent access to /admin
  if (to.path.startsWith("/admin") && userRole !== "admin") {
    return next("/");
  }

  next();
});


export default router;
