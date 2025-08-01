<template>
  <div class="manager-products">
    <NavBar />

    <!-- Manager toolbar -->
    <div class="manager-toolbar">
      <router-link to="/admin" class="toolbar-button">Users</router-link>
      <router-link to="/manager/add" class="toolbar-button">Add Product</router-link>
    </div>

    <main class="content">
      <div class="games-grid">
        <div
          class="game-card"
          v-for="game in pagedGames"
          :key="game.id"
        >
          <img :src="game.image" class="game-img" />
          <div class="price-bar">
            <span class="price-info">
              <span class="title">{{ game.title }}</span>
              <span class="price">${{ game.price }}</span>
            </span>
            <span class="bar-icons">
              <!-- EDIT ICON: routes to /manager/edit/:id -->
              <button class="icon-btn" @click.stop="editGame(game.id)">
                <ion-icon name="create-outline"></ion-icon>
              </button>
              <button class="icon-btn" @click.stop="deleteGame(game.id)">
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </span>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div class="pagination">
        <button @click="prevPage" :disabled="page === 1">‹</button>
        <button
          v-for="n in totalPages"
          :key="n"
          @click="page = n"
          :class="{ active: page === n }"
        >{{ n }}</button>
        <button @click="nextPage" :disabled="page === totalPages">›</button>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../../store/gamestore'
import NavBar from '../../components/NavBar.vue'
import Footer from '../../components/Footer.vue'

const router = useRouter()
const gameStore = useGameStore()

onMounted(() => {
  gameStore.fetchAll()
})

const page = ref(1)
const pageSize = 12

const totalPages = computed(() =>
  Math.ceil(gameStore.list.length / pageSize)
)
const pagedGames = computed(() =>
  gameStore.list.slice((page.value - 1) * pageSize, page.value * pageSize)
)
function prevPage() { if (page.value > 1) page.value-- }
function nextPage() { if (page.value < totalPages.value) page.value++ }

function editGame(id) {
  router.push(`/manager/edit/${id}`)
}
function deleteGame(id) {
  if (confirm('Delete this game?')) {
    gameStore.deleteGame(id)
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
}
.toolbar-button {
  background: #535bc9;
  padding: 0.5rem 1rem;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
}
.content {
  max-width: 1200px;
  margin: 2rem auto;
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
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
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
  background: #535bc9;
  padding: 0.9rem 0.9rem 0.85rem 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
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
  background: #2c3eeb;
  border: 2px solid #1a2a5a;
  border-radius: 6px;
  padding: 2px 8px 2px 8px;
  color: #fff;
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
