<script setup>
const { game } = defineProps(["game"]);
const gallery = game.gallery || [];
</script>

<template>
  <div class="gallery-container">
    <img
      v-for="(image, index) in gallery"
      :key="index"
      :src="`/galleries/${image}`"
      :alt="``"
      class="gallery-image"
    />
  </div>
</template>

<style scoped>
.gallery-container {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}
.gallery-image {
  width: 80px;
  border-radius: 6px;
}
</style>
