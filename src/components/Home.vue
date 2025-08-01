<script setup>
import { onMounted } from "vue";
import { useGameStore } from "@/stores/games";
import GameItem from "../components/GameItem.vue";

const gameStore = useGameStore();

onMounted(() => {
  gameStore.fetchGames();
});
</script>

<template>
  <section class="game-container">
    <GameItem v-for="game in gameStore.games" :key="game._id" :game="game" />
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
</style>
