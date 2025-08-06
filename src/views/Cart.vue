<script setup>
import { computed, onMounted } from "vue";
import { useCartStore } from "@/stores/cart";

const cart = useCartStore();
const items = computed(() => cart.items);
const total = computed(() => cart.totalPrice);
const TAX_RATE = 0.15;
const tax = computed(() => total.value * TAX_RATE);
const totalWithTax = computed(() => total.value + tax.value);

onMounted(() => {
  cart.refresh();
});

function removeItem(id) {
  cart.remove(id);
}

function clearCart() {
  cart.clear();
}
</script>

<template>
  <section class="cart-layout">
    <div class="cart-items-section">
      <h1 class="cart-title">Cart</h1>
      <div v-if="cart.isLoading" class="cart-loading">Loading...</div>
      <p v-else-if="!items.length" class="cart-empty">Your cart is empty.</p>
      <div v-else>
        <div v-for="item in items" :key="item._id" class="cart-game-card">
          <img :src="`/images/${item.imageUrl}.jpg`" :alt="item.title" class="cart-game-img" />
          <div class="cart-game-info">
            <h3>{{ item.title }}</h3>
            <p class="cart-game-desc">
              {{ item.description }}
            </p>
            <div class="cart-game-meta"></div>
          </div>
          <div class="cart-game-price">
            <span>{{ item.price }}$</span>
            <button class="remove-btn" @click="removeItem(item._id)">
              <span class="circle">−</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <aside class="cart-summary">
      <div class="cart-summary-box">
        <div class="cart-summary-row">
          <span>Sub-Total</span>
          <span>{{ total.toFixed(2) }}$</span>
        </div>
        <div class="cart-summary-row">
          <span>Taxes</span>
          <span>{{ tax.toFixed(2) }}$</span>
        </div>
        <div class="cart-summary-row total">
          <span>Total</span>
          <span>{{ totalWithTax.toFixed(2) }}$</span>
        </div>
        <button class="process-btn">Process</button>
        <button class="clear-btn" @click="clearCart">Clear Cart</button>
      </div>
    </aside>
  </section>
</template>

<style scoped>
.cart-layout {
  display: flex;
  justify-content: space-between;
  gap: 2.5rem;
  min-height: 70vh;
  padding: 3rem 2rem 2rem 2rem;
  background: radial-gradient(ellipse at top left, #233348 70%, #16202d 100%);
}

.cart-items-section {
  flex: 2;
  max-width: 650px;
}

.cart-title {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  letter-spacing: 0.02em;
}

.cart-game-card {
  display: flex;
  align-items: center;
  background: #222f3e;
  border-radius: 12px;
  padding: 1.1rem 1.2rem;
  margin-bottom: 1.4rem;
  box-shadow: 0 4px 18px #0003;
  transition: box-shadow 0.2s;
}
.cart-game-card:hover {
  box-shadow: 0 6px 30px #0005;
}
.cart-game-img {
  width: 160px;
  height: 88px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 1.4rem;
  box-shadow: 0 2px 8px #0004;
  background: #111;
}
.cart-game-info {
  flex: 1;
  min-width: 0;
}
.cart-game-info h3 {
  margin: 0 0 0.3rem 0;
  font-size: 1.1rem;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.01em;
}
.cart-game-desc {
  color: #b2becd;
  font-size: 0.92rem;
  margin-bottom: 0.5rem;
  margin-top: 0;
}
.cart-game-meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.os-icon {
  width: 20px;
  height: 20px;
  opacity: 0.9;
}

.cart-game-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 70px;
  gap: 0.6rem;
}
.cart-game-price span {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
}
.remove-btn {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
}
.remove-btn .circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #222b3a;
  color: #fff;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1.4rem;
  border: 2px solid #fff3;
  transition: background 0.15s, color 0.15s, border 0.2s;
}
.remove-btn .circle:hover {
  background: #ff6262;
  color: #fff;
  border: 2px solid #ff6262;
}

.cart-summary {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}
.cart-summary-box {
  min-width: 240px;
  background: #1e2630;
  border-radius: 12px;
  padding: 1.8rem 1.5rem;
  box-shadow: 0 6px 18px #0004;
  color: #fff;
  margin-top: 0.5rem;
}
.cart-summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 1.07rem;
  margin-bottom: 0.7rem;
}
.cart-summary-row.total {
  font-size: 1.13rem;
  font-weight: 700;
  margin-top: 0.3rem;
  margin-bottom: 1.6rem;
  color: #fff;
}
.process-btn {
  width: 100%;
  padding: 0.75rem 0;
  background: linear-gradient(90deg, #5c9efc, #7888ff 60%, #8e69e6);
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  font-size: 1.08rem;
  margin-bottom: 0.6rem;
  transition: background 0.2s;
  box-shadow: 0 2px 8px #0002;
  cursor: pointer;
}
.process-btn:hover {
  filter: brightness(1.1);
}
.clear-btn {
  width: 100%;
  padding: 0.5rem 0;
  background: none;
  border: 1.5px solid #42536b;
  color: #fff8;
  border-radius: 8px;
  font-size: 0.98rem;
  cursor: pointer;
  margin-top: 0.4rem;
  transition: border 0.15s, color 0.12s;
}
.clear-btn:hover {
  border: 1.5px solid #ff6262;
  color: #ff6262;
}

.cart-loading,
.cart-empty {
  color: #b2becd;
  font-size: 1.08rem;
  margin: 2rem 0;
  text-align: center;
}
@media (max-width: 1000px) {
  .cart-layout {
    flex-direction: column;
    gap: 1.8rem;
    padding: 2rem 0.7rem;
  }
  .cart-summary {
    justify-content: center;
  }
  .cart-summary-box {
    min-width: unset;
    width: 100%;
  }
}
</style>
