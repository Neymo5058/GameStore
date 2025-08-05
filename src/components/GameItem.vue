<script setup>
const { game } = defineProps({
  game: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <router-link
    class="game-items"
    :to="`/games/${game._id || game.id}`"
  >
    <img
      class="game-img"
      :src="game.imageUrl ? `/images/${game.imageUrl}.jpg` : game.image"
      :alt="game.title"
    />
    <div class="game-details">
      <h2 class="game-title">
        <strong>{{ game.title }}</strong>
      </h2>
      <p class="game-price">{{ game.price }} $</p>
    </div>
  </router-link>
</template>

<style scoped>
.game-items {
  background: #1864ab;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
}
.game-details {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
}
.game-items h2 {
  color: #f8f9fa;
  font-size: 1.2rem;
  font-weight: 600;
}
.game-items p {
  color: #f8f9fa;
  font-size: 1rem;
  font-weight: 400;
}

.game-img {
  width: 100%;

  object-fit: cover;
}
</style>
