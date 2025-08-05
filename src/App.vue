<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
  <Footer />
</template>

<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<style>
/* Full reset */
html,
body {
  margin: 0;
  padding: 0;
  background-color: #243248;
}

/* Make sure root has no padding/margin */
#app {
  margin: 0;
  padding: 0;
  background-color: #243248;
  min-height: 100vh;
}
</style>
