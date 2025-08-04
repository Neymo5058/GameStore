<script setup>
import { FadeLoader } from "vue3-spinner";
defineProps({
  color: {
    type: String,
    default: "#10b981",
  },
  size: {
    type: Number,
    default: 15,
  },
});
</script>

<template>
  <div class="spinner-wrapper">
    <FadeLoader :loading="true" color="#10b981" :size="100" />
  </div>
</template>

<style scoped>
.spinner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
