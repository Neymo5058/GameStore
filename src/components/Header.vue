<script setup>
import logoUrl from "../../public/images/GameStore-Logo.png";
</script>

<template>
  <header>
    <div class="header__content">
      <img :src="logoUrl" alt="Logo" class="header__logo" />
      <router-link to="/store" class="header__link">Store</router-link>
      <router-link to="/login" class="header__link">Login</router-link>
      <router-link to="/about" class="header__link">About</router-link>
    </div>
  </header>
</template>

<style scoped>
header {
  background-color: #171a21;
  padding: 4rem 1rem;
  display: flex;
  justify-content: center;
}

.header__content {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.header__logo {
  height: 2.4rem;
}
.header__link {
  color: #f8f9fa;
  font-weight: bold;
  font-size: 1.4rem;
  cursor: pointer;
  text-decoration: none;
}

.header__title {
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
}

.header__link:hover {
  color: #3b82f6;
}
</style>
