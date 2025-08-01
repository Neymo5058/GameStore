<script setup>
defineProps({
  game: {
    type: Object,
    required: true,
  },
});
function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
</script>

<template>
  <section class="game-section">
    <div class="main-container">
      <div class="gallery-container">
        <div class="main-img-container">
          <img src="/images/img-1.jpg" alt="" />
        </div>
        <div class="image-container">
          <div class="gallery-img-container">
            <img src="/images/img-1.jpg" alt="" />
          </div>
          <div class="gallery-img-container">
            <img src="/images/img-1.jpg" alt="" />
          </div>
          <div class="gallery-img-container">
            <img src="/images/img-1.jpg" alt="" />
          </div>
          <div class="gallery-img-container">
            <img src="/images/img-1.jpg" alt="" />
          </div>
          <div class="gallery-img-container">
            <img src="/images/img-1.jpg" alt="" />
          </div>
        </div>
      </div>

      <div class="card">
        <img class="game-img" :src="`/images/${game.imageUrl}.jpg`" :alt="game.title" />
        <div class="infos-container">
          <h2 class="game-header">{{ game.title }}</h2>
          <p class="game-infos"><strong>Description:</strong> {{ game.description }}</p>
          <p class="game-infos"><strong>Price:</strong> {{ game.price }} $</p>
          <p class="game-infos"><strong>Reviews:</strong> {{ game.reviews }}</p>
          <p class="game-infos"><strong>Platform: </strong>{{ game.platform }}</p>
          <p class="game-infos">
            <strong>Release Date: </strong>{{ formatDate(game.releaseDate) }}
          </p>
          <p class="game-infos"><strong>Developper: </strong>{{ game.developer }}</p>
          <p class="game-infos"><strong>Category: </strong>{{ game.category.name }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.game-section {
  display: flex;
  padding: 2rem;
  background: linear-gradient(to bottom, #1b2838, #2a475e);
}
.card {
  display: flex;
  flex-direction: column;
  background-color: #1864ab;
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
}
.infos-container {
  padding: 1rem;
}
.game-infos {
  color: #f8f9fa;
  line-height: 1.5;
}

.main-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
}
.gallery-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #1864ab;
  border-radius: 4px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
}

.image-container {
  display: flex;
}
img {
  width: 100%;
  display: block;
}
h2 {
  color: #f8f9fa;
  font-size: 1.8rem;
}

p strong {
  color: #212529;
}

.card > img {
  width: 100%;
  aspect-ratio: 16 / 9;
}
</style>
