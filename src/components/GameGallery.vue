<script setup>
import { ref } from "vue";
const { game } = defineProps(["game"]);
const gallery = game.gallery || [];
const selectedImage = ref(gallery[0]);
</script>

<template>
  <div v-if="game.gallery && game.gallery.length" class="gallery-container">
    <div class="main-img-container">
      <img :src="`/galleries/${selectedImage}`" alt="Main image" class="main-image" />
    </div>

    <div class="thumbnails-container">
      <img
        v-for="(img, index) in game.gallery"
        :key="index"
        :src="`/galleries/${img}`"
        alt="Thumbnail"
        class="thumbnail-image"
        @click="selectedImage = img"
      />
    </div>
  </div>
</template>

<style scoped>
.gallery-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #1864ab;
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
}

.main-img-container {
  width: 100%;
}

.main-image {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
}

.thumbnails-container {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
}

.thumbnail-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.2s;
}

.thumbnail-image:hover {
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
}
</style>
