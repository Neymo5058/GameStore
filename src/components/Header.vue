<script setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cart";

const auth = useAuthStore();
const cart = useCartStore();
const router = useRouter();

// Restore from localStorage on page load
onMounted(() => {
  auth.restore();
  cart.restore?.();
});

const isLogged = computed(() => !!auth.user);
const userEmail = computed(() => auth.user?.email || "");
const userRole = computed(() => auth.user?.role || "");
const cartCount = computed(() => cart.totalItems);

function logout() {
  auth.logout(router);
}
</script>

<template>
  <header class="header">
    <div class="header__content">
      <router-link to="/" class="header__logo-link">
        <img src="/images/GameStore-Logo.png" alt="GameStore Logo" class="header__logo" />
      </router-link>
      <nav class="header__nav">
        <router-link to="/" class="header__link" exact-active-class="active">Store</router-link>
        <router-link
          :to="{ path: '/', hash: '#footer' }"
          class="header__link"
          exact-active-class="active"
          >About</router-link
        >
        <router-link to="/cart" class="header__link header__cart" exact-active-class="active">
          <span class="header__cart-icon">🛒</span>
          <span v-if="cartCount" class="header__cart-count">{{ cartCount }}</span>
        </router-link>

        <router-link v-if="!isLogged" to="/login" class="header__link" exact-active-class="active">
          Login
        </router-link>
        <button v-else @click="logout" class="header__link logout-btn">Logout</button>
      </nav>
      <div v-if="isLogged" class="header__user-box">
        Connected as: <b>{{ userEmail }}</b>
        <span v-if="userRole" class="header__role">({{ userRole }})</span>
      </div>
    </div>
  </header>
</template>
<style scoped>
.header {
  background: #171a21;
  padding: 2rem 1rem 1.2rem 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.13);
  display: flex;
  justify-content: center;
}
.header__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1240px;
  width: 100%;
}
.header__logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 0.7rem;
}
.header__logo {
  height: 2.5rem;
  margin-right: 2px;
}
.brand {
  color: #f8f9fa;
  font-weight: bold;
  font-size: 1.7rem;
  letter-spacing: 0.5px;
}
.header__nav {
  display: flex;
  gap: 2.1rem;
}
.header__link {
  color: #f8f9fa;
  font-weight: 600;
  font-size: 1.2rem;
  cursor: pointer;
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
  transition: color 0.16s;
}
.header__cart {
  position: relative;
}
.header__cart-icon {
  display: block;
  font-size: 1.4rem;
}
.header__cart-count {
  position: absolute;
  top: 0rem;
  right: 0rem;
  background: #3b82f6;
  color: #f8f9fa;
  border-radius: 50%;
  padding: 0 0.35rem;
  font-size: 0.75rem;
}

.header__link:hover,
.logout-btn:hover,
.login-btn:hover {
  color: #3b82f6;
}
.logout-btn {
  cursor: pointer;
}
.header__user-box {
  background: #23283b;
  color: #f8f9fa;
  border-radius: 5px;
  padding: 0.42rem 1rem;
  font-size: 0.98rem;
  margin-left: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.45rem;
}
.header__role {
  font-size: 0.95em;
  color: #b8eaff;
  margin-left: 0.25rem;
}
@media (max-width: 900px) {
  .header__content {
    flex-direction: column;
    gap: 0.9rem;
  }
}
</style>
