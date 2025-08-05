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
  <section class="cart">
    <h1 class="cart__title">Shopping Cart</h1>
    <LoadingSpinner v-if="cart.isLoading" />
    <p v-else-if="!items.length">Your cart is empty.</p>
    <div v-else>
      <div v-for="item in items" :key="item._id" class="cart__item">
        <img
          class="cart__img"
          :src="`/images/${item.imageUrl}.jpg`"
          :alt="item.title"
        />
        <div class="cart__info">
          <h3 class="cart__name">{{ item.title }}</h3>
          <p class="cart__price">{{ item.price }} $</p>
        </div>
        <button class="cart__remove" @click="removeItem(item._id)">Remove</button>
      </div>
      <div class="cart__summary">
        <div class="cart__totals">
          <p class="cart__tax">Tax: {{ tax.toFixed(2) }} $</p>
          <p class="cart__total">Total: {{ totalWithTax.toFixed(2) }} $</p>
        </div>
        <button class="cart__clear" @click="clearCart">Clear Cart</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cart {
  padding: 2rem;
  background: linear-gradient(to bottom, #1b2838, #2a475e);
  min-height: 60vh;
  color: #f8f9fa;
}
.cart__title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}
.cart__item {
  display: flex;
  align-items: center;
  background: #1864ab;
  margin-bottom: 1rem;
  border-radius: 6px;
  overflow: hidden;
}
.cart__img {
  width: 120px;
  height: 80px;
  object-fit: cover;
}
.cart__info {
  flex: 1;
  padding: 0.5rem 1rem;
}
.cart__name {
  font-size: 1.2rem;
  margin: 0 0 0.25rem 0;
}
.cart__price {
  margin: 0;
}
.cart__remove {
  background: none;
  border: none;
  color: #ff6b6b;
  font-weight: bold;
  padding: 0 1rem;
  cursor: pointer;
}
.cart__summary {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cart__totals {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.cart__clear {
  background: #343a40;
  color: #f8f9fa;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
}
</style>
