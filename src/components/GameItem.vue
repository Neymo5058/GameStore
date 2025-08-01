<script setup>
defineProps({
  game: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="game-items">
    <img class="game-img" :src="`/images/${game.imageUrl}.jpg`" :alt="game.title" />
    <h2 class="game-title">{{ game.title }}</h2>
    <p class="game-price"><strong>Price:</strong> {{ game.price }} $</p>
  </div>
</template>

<style scoped>
.game-items {
  background: #1864ab;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.game-items p,
.game-items h2 {
  color: #f8f9fa;
}
.game-img {
  width: 100%;

  object-fit: cover;
}
</style>
