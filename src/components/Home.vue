<script setup>
import { onMounted } from "vue";
import { useGameStore } from "@/stores/games";
import GameItem from "../components/GameItem.vue";
<<<<<<< Updated upstream
import Pagination from "../components/Pagination.vue";
import Spinner from "../components/Spinner.vue";
=======
import LoadingSpinner from "../components/LoadingSpinner.vue";
>>>>>>> Stashed changes

const gameStore = useGameStore();

onMounted(() => {
  gameStore.fetchGames();
});
</script>

<template>
<<<<<<< Updated upstream
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
=======
  <section class="game-container">
    <LoadingSpinner v-if="gameStore.isLoading" />
    <template v-else>
      <GameItem
        v-for="game in gameStore.games"
        :key="game._id || game.id"
        :game="game"
      />
    </template>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
.pagination-container {
  display: flex;
  justify-content: center;
}
.spinner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
=======
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem 0;
}
.pagination button {
  width: 32px; height: 32px;
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
>>>>>>> Stashed changes
}
</style>
