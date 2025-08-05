<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <main class="content">
      <LoadingSpinner v-if="gameStore.isLoading" />
      <div v-else class="games-grid">
        <router-link
          v-for="game in games"
          :key="game._id || game.id"
          :to="`/games/${game._id || game.id}`"
          class="game-card-link"
        >
          <div class="game-card">
            <img :src="game.imageUrl ? `/images/${game.imageUrl}.jpg` : game.image" class="game-img" />
            <div class="price-bar">
              <span class="price-info">
                <span class="title">{{ game.title }}</span>
                <span class="price">${{ game.price }}</span>
              </span>
            </div>
          </div>
        </router-link>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="page === 1">‹</button>
        <button
          v-for="n in totalPages"
          :key="n"
          @click="page = n"
          :class="{ active: page === n }"
        >
          {{ n }}
        </button>
        <button @click="nextPage" :disabled="page === totalPages">›</button>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

import Footer from "../components/Footer.vue";
import { useGameStore } from "../stores/games"; 
const gameStore = useGameStore();

const page = ref(1);
const pageSize = 12;

onMounted(() => {
  gameStore.fetchGames(page.value, pageSize);
});

watch(page, (newPage) => {
  gameStore.fetchGames(newPage, pageSize);
});

const games = computed(() =>
  Array.isArray(gameStore.games) ? gameStore.games : []
);

const totalPages = computed(
  () => gameStore.pagination?.totalPages || gameStore.totalPages || 1
);

function prevPage() {
  if (page.value > 1) page.value--;
}
function nextPage() {
  if (page.value < totalPages.value) page.value++;
}
</script>

<style scoped>
.home {
  background: #243248;
  min-height: 100vh;
}

.content {
  max-width: 1200px;
  margin: 2rem auto;
}
.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 320px));
  justify-content: center;
  gap: 2rem;
  margin: 0 auto;
}

.game-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.game-card {
  position: relative;
  width: 320px;
  border-radius: 12px;
  overflow: hidden;
  background: #34495e;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
  text-decoration: none;
  color: inherit;
  transition: transform 0.13s;
}
.game-card:hover {
  transform: translateY(-6px) scale(1.03);
}

.game-img {
  width: 100%;
  height: 200px;
  object-fit: contain;
  background: #243248;
  display: block;
}

.price-bar {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #535bc9;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-size: 1.15rem;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-sizing: border-box;
}

.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 65%;
  display: inline-block;
}

.price {
  font-weight: bold;
  margin-left: 0.5rem;
  flex-shrink: 0;
  white-space: nowrap;
  font-size: 1.15em;
}

/* pagination */
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem 0;
}
.pagination button {
  width: 32px;
  height: 32px;
  border: none;
  background: #34495e;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
.pagination button.active {
  background: #535bc9;
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
