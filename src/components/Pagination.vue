<script setup>
const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});

const emit = defineEmits(["change-page"]);

const paginate = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit("change-page", page);
  }
};
</script>

<template>
  <div class="pagination">
    <button :disabled="currentPage === 1" @click="paginate(currentPage - 1)">‹</button>

    <button
      v-for="p in totalPages"
      :key="p"
      @click="paginate(p)"
      :class="{ active: currentPage === p }"
    >
      {{ p }}
    </button>

    <button :disabled="currentPage === totalPages" @click="paginate(currentPage + 1)">›</button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
  background: #1c7ed6;
  padding: 0.4rem 0.9rem;
  border-radius: 2px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.pagination button {
  width: 32px;
  height: 32px;
  border: none;
  background: #34495e;
  color: #f8f9fa;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.pagination button:hover:not(:disabled) {
  background: #1e62d0;
  transform: scale(1.1);
}

.pagination button.active {
  background: #1e62d0;
  font-weight: bold;
}

.pagination button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
