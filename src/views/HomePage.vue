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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 2rem;
}
</style>
