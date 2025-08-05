<script setup>
import { onMounted } from "vue";
import { useGameStore } from "@/stores/games";
import GameItem from "../components/GameItem.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";

const gameStore = useGameStore();

onMounted(() => {
  gameStore.fetchGames();
});
</script>

<template>
  <section class="game-container">
    <LoadingSpinner v-if="gameStore.isLoading" />
    <template v-else>
      <GameItem
        v-for="game in gameStore.games"
        :key="game._id || game.id"
        :game="game"
      />
    </template>
  </section>
</template>

<style scoped>
.game-container {
  display: grid;
  gap: 1.5rem;
  padding: 2rem;
  grid-template-columns: repeat(3, 1fr);
  background: linear-gradient(to bottom, #1b2838, #2a475e);
  grid-template-columns: repeat(3, 1fr);
}
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
}
</style>
