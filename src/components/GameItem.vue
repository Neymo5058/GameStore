<script setup>
defineProps({
  game: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="game-card">
    <img class="game-img" :src="`/images/${game.imageUrl}.jpg`" :alt="game.title" />
    <h2 class="game-title">{{ game.title }}</h2>
    <p class="game-price"><strong>Price:</strong> {{ game.price }} $</p>
  </div>
</template>

<style scoped>
.game-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;
}
.game-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
