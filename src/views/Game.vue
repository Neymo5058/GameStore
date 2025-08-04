<script setup>
import GameCard from "@/components/GameCard.vue";
import Spinner from "@/components/Spinner.vue";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const game = ref(null);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get(`/api/games/${route.params.id}`);
    game.value = response.data.data.game;
  } catch (err) {
    error.value = "Game not found";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});
</script>
<template>
  <div class="game-container">
    <Spinner v-if="isLoading" />
    <p v-else-if="error" class="error">{{ error }}</p>
    <GameCard v-else :game="game" />
  </div>
</template>
