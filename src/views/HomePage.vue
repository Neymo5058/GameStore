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
            <img
              :src="game.imageUrl ? `/images/${game.imageUrl}.jpg` : game.image"
              class="game-img"
            />
            <div class="price-bar">
              <span class="price-info">
                <span class="title">{{ game.title }}</span>
                <span class="price">${{ game.price }}</span>
              </span>
            </div>
          </div>
        </router-link>
      </div>
      <Pagination
        :currentPage="page"
        :totalPages="totalPages"
        @change-page="(newPage) => (page = newPage)"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import Pagination from "@/components/Pagination.vue";
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

const games = computed(() => (Array.isArray(gameStore.games) ? gameStore.games : []));

const totalPages = computed(() => gameStore.pagination?.totalPages || gameStore.totalPages || 1);
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
  align-items: start;
}

.game-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.price-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  width: 100%;
}

.game-card {
  position: relative;
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  height: 160px;
  object-fit: cover;
  background: #243248;
  display: block;
}

.price-bar {
  background: #1864ab;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-size: 1rem;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-sizing: border-box;
}

.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  display: inline-block;
}

.price {
  font-weight: bold;
  flex-shrink: 0;
  white-space: nowrap;
  font-size: 1.1em;
}
</style>
