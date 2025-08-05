<script setup>
import { onMounted } from "vue";
import { useGameStore } from "@/stores/games";
import GameItem from "../components/GameItem.vue";
import Pagination from "../components/Pagination.vue";
import Spinner from "../components/Spinner.vue";

const gameStore = useGameStore();

onMounted(() => {
  gameStore.fetchGames();
});
</script>

<template>
  <section class="store-home">
    <div v-if="gameStore.isLoading" class="spinner-wrapper">
      <Spinner />
    </div>
    <section class="game-container">
      <GameItem v-for="game in gameStore.games" :key="game._id" :game="game" />
    </section>

    <div class="pagination-container">
      <Pagination
        :currentPage="gameStore.currentPage"
        :totalPages="gameStore.totalPages"
        @change-page="(page) => gameStore.fetchGames(page)"
      />
    </div>
  </section>
</template>

<style scoped>
.store-home {
  background: linear-gradient(to bottom, #1b2838, #2a475e);
}
.game-container {
  display: grid;
  gap: 1.5rem;
  padding: 2rem;
  grid-template-columns: repeat(3, 1fr);

  grid-template-columns: repeat(3, 1fr);
}
.pagination-container {
  display: flex;
  justify-content: center;
}
.spinner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
}
</style>
