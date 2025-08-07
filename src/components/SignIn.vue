<template>
  <div class="auth-page">
    <main class="auth-main">
      <div class="auth-container">
        <h1>{{ $t("sign_in") }}</h1>
        <div class="auth-card">
          <label for="email" class="field-label signin-title">
            {{ $t("sign_in_with_email") }}
          </label>
          <input
            v-model="email"
            type="email"
            name="email"
            id="email"
            :placeholder="$t('email_placeholder')"
            required
            autocomplete="email"
          />

          <label for="password" class="field-label uppercase">
            {{ $t("password") }}
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            :placeholder="$t('password_placeholder')"
            required
          />

          <div class="error-msg" v-if="error">{{ error }}</div>

          <button class="btn-primary" @click="submit" :disabled="pending">
            <span v-if="pending">{{ $t("signing_in") }}</span>
            <span v-else>{{ $t("sign_in") }}</span>
          </button>
        </div>
        <div class="signup-prompt">
          <span>{{ $t("new_to_gamestore") }}</span>
          <router-link to="/signup" class="btn-secondary">
            {{ $t("sign_up") }}
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const email = ref("");
const password = ref("");
const error = ref("");
const pending = ref(false);
const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

async function submit() {
  error.value = "";
  pending.value = true;
  try {
    await auth.login({ email: email.value, password: password.value });
    const next = route.query.next;
    const isSafeNext =
      typeof next === "string" &&
      next.startsWith("/") &&
      !next.startsWith("//") &&
      !next.includes("://");
    if (isSafeNext) {
      router.push(next);
    } else if (["admin", "manager"].includes(auth.role)) {
      router.push("/manager");
    } else {
      router.push("/");
    }
  } catch (err) {
    error.value = t("invalid_credentials_or_server_error");
  } finally {
    pending.value = false;
  }
}
</script>

<style scoped>
.auth-page {
  background: linear-gradient(to bottom, #1b2838, #2a475e);
  color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.auth-main {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 3rem 1rem;
}
.auth-container {
  max-width: 400px;
  width: 100%;
}
.auth-container h1 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
}
.auth-card {
  background: #171a21;
  padding: 3rem;
  border-radius: 4px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.field-label {
  font-size: 0.85rem;

  color: #bbb;
}
.field-label.uppercase {
  text-transform: uppercase;
}
.auth-card input {
  background: #1f1f29;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  color: #f8f9fa;
  font-size: 1rem;
}
.auth-card input {
  background: linear-gradient(to right, #36393f, #2c2f33);
}
.btn-primary {
  padding: 0.8rem 1.6rem;
  border: none;
  background: linear-gradient(to right, #06bfff, #2d73ff);
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: filter 0.2s;
  color: #f8f9fa;
  align-self: center;
}
.btn-primary:hover {
  filter: brightness(1.1);
}
.btn-primary[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
.signup-prompt {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  margin-top: 1rem;
}
.btn-secondary {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: linear-gradient(to right, #06bfff, #2d73ff);
  color: #f8f9fa;
  text-decoration: none;
  font-size: 0.9rem;
  cursor: pointer;
  transition: filter 0.2s;
}
.btn-secondary:hover {
  filter: brightness(1.1);
}
.error-msg {
  color: #ff5252;

  font-size: 0.98em;
}

.signin-title {
  color: #1a9fff;
  font-size: 1.2rem;
}
</style>
