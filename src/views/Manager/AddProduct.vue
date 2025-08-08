<template>
  <div class="add-product-page">
    <header />

    <div class="toolbar">
      <router-link to="/admin" class="toolbar-btn">Manage Users</router-link>

      <router-link to="/manager/add" class="toolbar-btn" :class="{ active: !isEditMode }"
        >Add product</router-link
      >
    </div>

    <main class="main-content">
      <Spinner v-if="gameStore.isLoading" />
      <div v-else class="form-card">
        <h3 class="form-title">{{ isEditMode ? "Edit Product" : "Add Product" }}</h3>
        <form @submit.prevent="saveProduct">
          <label class="form-label">Title</label>
          <input v-model="title" class="form-input" required />

          <label class="form-label">Description</label>
          <input v-model="description" class="form-input" required />

          <label class="form-label">Platform</label>
          <input v-model="platform" class="form-input" required />

          <label class="form-label">Release Date</label>
          <input v-model="releaseDate" type="date" class="form-input" required />

          <label class="form-label">Developer</label>
          <input v-model="developer" class="form-input" required />

          <label class="form-label">Category</label>
          <select v-model="category" class="form-input" multiple>
            <option v-for="cat in categoryOptions" :key="cat" :value="cat">{{ cat }}</option>
          </select>
          <div class="category-tags">
            <span v-for="cat in category" :key="cat" class="category-tag">{{ cat }}</span>
          </div>

          <label class="form-label">Price</label>
          <input v-model.number="price" type="number" min="0" class="form-input" required />

          <label class="form-label">Reviews</label>
          <input
            v-model.number="reviews"
            type="number"
            min="0"
            max="5"
            step="0.1"
            class="form-input"
          />

          <label class="form-label">Image URL</label>
          <input v-model="imageUrl" class="form-input" required />

          <label class="form-label">Gallery URLs (comma separated)</label>
          <textarea v-model="galleryInput" class="form-input"></textarea>

          <button class="add-btn" type="submit">{{ isEditMode ? "Save" : "Add" }}</button>
        </form>
        <div v-if="success" class="success-msg">
          {{ isEditMode ? "Product updated!" : "Product added!" }}
          <router-link to="/manager">Return to manager</router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useGameStore } from "../../stores/games";
import Spinner from "../../components/Spinner.vue";

const route = useRoute();
const gameStore = useGameStore();

const id = computed(() => route.params.id);
const isEditMode = computed(() => !!id.value);

const title = ref("");
const description = ref("");
const platform = ref("PC");
const releaseDate = ref("");
const developer = ref("");
const category = ref([]);
const price = ref(0);
const reviews = ref(0);
const imageUrl = ref("");
const galleryInput = ref("");
const success = ref(false);

// Suggested category options
const categoryOptions = [
  "Action",
  "Adventure",
  "RPG",
  "Shooter",
  "Simulation",
  "Strategy",
  "Sports",
  "Racing",
  "Indie",
  "Puzzle",
];

onMounted(async () => {
  if (!gameStore.games.length) {
    await gameStore.fetchGames();
  }
  if (isEditMode.value) {
    // Find the product by id
    const product = gameStore.getGameById(id.value);
    if (product) {
      title.value = product.title;
      description.value = product.description;
      platform.value = product.platform;
      releaseDate.value = product.releaseDate;
      developer.value = product.developer;
      // For backward compatibility: support string, array, or object
      category.value = Array.isArray(product.category)
        ? product.category.map((cat) => (typeof cat === "string" ? cat : cat.name || cat._id))
        : product.category
        ? [
            typeof product.category === "string"
              ? product.category
              : product.category.name || product.category._id,
          ]
        : [];
      price.value = product.price;
      reviews.value = product.reviews || 0;
      imageUrl.value = product.imageUrl || "";
      galleryInput.value = product.gallery ? product.gallery.join(", ") : "";
    }
  } else {
    // On "add", set platform to PC by default and category empty
    platform.value = "PC";
    category.value = [];
    reviews.value = 0;
    imageUrl.value = "";
    galleryInput.value = "";
  }
});

async function saveProduct() {
  const formattedCategories = category.value.map((cat) =>
    typeof cat === "string" ? cat : cat.name || cat._id
  );
  const gallery = galleryInput.value
    .split(",")
    .map((g) => g.trim())
    .filter((g) => g);
  if (isEditMode.value) {
    // Edit existing product
    await gameStore.updateGame(id.value, {
      title: title.value,
      description: description.value,
      platform: platform.value,
      releaseDate: releaseDate.value,
      developer: developer.value,
      category: formattedCategories,
      price: price.value,
      reviews: reviews.value,
      imageUrl: imageUrl.value,
      gallery,
    });
    success.value = true;
  } else {
    // Add new product
    await gameStore.addGame({
      title: title.value,
      description: description.value,
      platform: platform.value,
      releaseDate: releaseDate.value,
      developer: developer.value,
      category: formattedCategories,
      price: price.value,
      reviews: reviews.value,
      imageUrl: imageUrl.value,
      gallery,
    });
    success.value = true;
    title.value = "";
    description.value = "";
    platform.value = "PC";
    releaseDate.value = "";
    developer.value = "";
    category.value = [];
    price.value = 0;
    reviews.value = 0;
    imageUrl.value = "";
    galleryInput.value = "";
  }
}
</script>

<style scoped>
.add-product-page {
  min-height: 100vh;
  background: #243248;
  color: #f8f9fa;
  display: flex;
  flex-direction: column;
}
.toolbar {
  display: flex;
  gap: 1rem;
  max-width: 900px;
  margin: 2.2rem auto 0;
}
.toolbar-btn {
  background: linear-gradient(to right, #06bfff, #2d73ff);
  color: #f8f9fa;
  border-radius: 4px;
  padding: 0.37rem 1.1rem;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  opacity: 0.85;
  transition: background 0.16s, opacity 0.13s;
}
.toolbar-btn:hover,
.toolbar-btn.active {
  background: linear-gradient(to right, #06bfff, #2d73ff);

  opacity: 1;
}
.main-content {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;
  flex: 1;
}
.form-card {
  background: #181c22;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 2.3rem 2.4rem 2.2rem 2.4rem;
  min-width: 430px;
  max-width: 650px;
  width: 100%;
}
.form-title {
  font-size: 1.05rem;
  font-weight: 500;
  color: #1a9fff;
  margin-bottom: 2rem;
  margin-top: 0;
  letter-spacing: 0.01em;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1.22rem;
}
.form-label {
  font-size: 1rem;
  color: #e2e2e2;
  font-weight: 500;
  margin-bottom: 0.28rem;
}
.form-input {
  width: 100%;
  padding: 0.62rem 1rem;
  background: #292d33;
  border: none;
  border-radius: 5px;
  color: #d3e3ff;
  font-size: 1rem;
  font-family: inherit;
  outline: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08) inset;
  margin-bottom: 0.1rem;
  transition: background 0.13s;
  background: linear-gradient(to right, #36393f, #2c2f33);
}
.form-input:focus {
  background: #344569;
}
.add-btn {
  margin-top: 2.1rem;
  width: 120px;
  align-self: center;
  padding: 0.72rem 1.5rem;
  border: none;
  border-radius: 6px;
  background: linear-gradient(to right, #06bfff, #2d73ff);
  color: #f8f9fa;
  font-size: 1.12rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(30, 80, 180, 0.12);
  transition: filter 0.16s, box-shadow 0.14s;
}
.add-btn:hover {
  filter: brightness(1.11);
  box-shadow: 0 4px 12px rgba(30, 80, 180, 0.14);
}
.success-msg {
  margin-top: 2rem;
  background: #27335a;
  color: #9ae897;
  border-radius: 5px;
  padding: 0.7rem 1.1rem;
  text-align: center;
  font-size: 1.04rem;
}
.category-tags {
  margin-top: 0.35rem;
  margin-bottom: -0.7rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.category-tag {
  background: linear-gradient(to right, #06bfff, #2d73ff);
  color: #f8f9fa;
  padding: 0.2rem 0.9rem;
  border-radius: 14px;
  font-size: 0.93rem;
  letter-spacing: 0.03em;
  margin-right: 0.15rem;
}
</style>
