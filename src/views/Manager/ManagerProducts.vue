<template>
  <div class="manager-products">
    <!-- Manager toolbar -->
    <div class="manager-toolbar">
      <router-link v-if="isAdmin" to="/admin" class="toolbar-button">Users</router-link>
      <router-link to="/manager/add" class="toolbar-button">Add Product</router-link>
    </div>

    <main class="content">
      <Spinner v-if="gameStore.isLoading" />
      <div v-else>
        <p v-if="gameStore.error" class="error-msg">{{ gameStore.error }}</p>
        <div v-else class="games-grid">
          <div class="game-card" v-for="game in pagedGames" :key="game._id">
            <img
              :src="game.imageUrl ? `/images/${game.imageUrl}.jpg` : game.image"
              class="game-img"
            />
            <div class="price-bar">
              <span class="price-info">
                <span class="title">{{ game.title }}</span>
                <span class="price">${{ game.price }}</span>
              </span>
              <span class="bar-icons">
                <button class="icon-btn" @click.stop="editGame(game._id)">
                  <ion-icon name="create-outline"></ion-icon>
                </button>
                <button class="icon-btn" @click.stop="deleteGame(game._id)">
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div class="pagination">
        <Pagination
          :currentPage="page"
          :totalPages="totalPages"
          @change-page="(newPage) => (page = newPage)"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useGameStore } from "../../stores/games";
import { useAuthStore } from "../../stores/authStore";
import Pagination from "../../components/Pagination.vue";
import Spinner from "../../components/Spinner.vue";

const router = useRouter();
const gameStore = useGameStore();
const auth = useAuthStore();

const isAdmin = computed(() => auth.role === "admin");

onMounted(() => {
  gameStore.fetchGames(page.value, pageSize);
});

const page = ref(1);
const pageSize = 12;

watch(page, () => {
  gameStore.fetchGames(page.value, pageSize);
});

const totalPages = computed(() => gameStore.pagination?.totalPages || gameStore.totalPages || 1);
const pagedGames = computed(() => gameStore.games || []);

function prevPage() {
  if (page.value > 1) page.value--;
}
function nextPage() {
  if (page.value < totalPages.value) page.value++;
}

function editGame(id) {
  router.push({ name: "AddProduct", params: { id } });
}
async function deleteGame(id) {
  if (confirm("Delete this game?")) {
    try {
      await gameStore.deleteGame(id);
    } catch (e) {
      alert(gameStore.error || "Failed to delete game");
    }
  }
}
</script>

<style scoped>
.manager-products {
  background: #243248;
  min-height: 100vh;
}
.manager-toolbar {
  display: flex;
  gap: 1rem;
  max-width: 1200px;
  margin: 1.5rem auto 0;
  justify-content: center;
}
.toolbar-button {
  background: linear-gradient(to right, #06bfff, #2d73ff);
  padding: 0.5rem 1rem;
  color: #f8f9fa;
  border-radius: 4px;
  text-decoration: none;
}
.content {
  max-width: 1200px;
  margin: 2rem auto;
}
.error-msg {
  color: #ff6b6b;
  text-align: center;
  margin-bottom: 1rem;
}
.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 320px));
  justify-content: center;
  gap: 2rem;
  margin: 0 auto;
}
.game-card {
  position: relative;
  width: 320px;
  border-radius: 12px;
  overflow: hidden;
  background: #34495e;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
  text-decoration: none;
  color: inherit;
  transition: transform 0.13s;
}
.game-card:hover {
  transform: translateY(-6px) scale(1.03);
}
.game-img {
  width: 100%;
  height: 200px;
  object-fit: contain;
  background: #243248;
  display: block;
}
.price-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #1864ab;
  padding: 0.9rem 0.9rem 0.85rem 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #f8f9fa;
  font-size: 1.08rem;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-sizing: border-box;
  gap: 0.7rem;
}
.price-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
  flex: 1 1 auto;
}
.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 400;
  max-width: 140px;
  min-width: 0;
}
.price {
  font-weight: bold;
  margin-left: 0.5rem;
  white-space: nowrap;
  flex-shrink: 0;
  font-size: 1.15em;
}
.bar-icons {
  display: flex;
  gap: 0.3rem;
  flex-shrink: 0;
}
.icon-btn {
  background: linear-gradient(to right, #06bfff, #2d73ff);
  border: 0px solid #1a2a5a;
  border-radius: 6px;
  padding: 2px 8px 2px 8px;
  color: #f8f9fa;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background 0.2s;
  margin-left: 0;
}
.icon-btn:hover {
  background: #4459d7;
  border-color: #3647a7;
}
.icon-btn ion-icon {
  font-size: 1.15em;
  vertical-align: middle;
}
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem 0;
}
.pagination button {
  width: 32px;
  height: 32px;
  border: none;
  background: #34495e;
  color: #f8f9fa;
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
