<script setup></script>

<template>
  <div class="spinner-wrap">
    <div class="spinner" aria-label="Loading" />
  </div>
</template>

<style scoped>
.spinner-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80px;
}
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #06bfff;
  border-top-color: #2d73ff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
