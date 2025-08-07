<template>
  <div class="auth-page">
    <Header />

    <main class="auth-main">
      <div class="auth-container">
        <h1>{{ $t("sign_in") }}</h1>

        <div class="auth-card">
          <label class="field-label">{{ $t("sign_in_with_email") }}</label>
          <input v-model="email" type="email" :placeholder="$t('email_placeholder')" />

          <label class="field-label uppercase">{{ $t("password") }}</label>
          <input v-model="password" type="password" :placeholder="$t('password_placeholder')" />

          <button class="btn-primary" @click="submit">{{ $t("sign_in") }}</button>

          <!-- Connected user info box -->
          <div v-if="isLogged" class="connected-box">
            {{ $t("connected_as") }} <b>{{ auth.user.email }}</b>
            <span class="role-label">({{ auth.role }})</span>
          </div>
        </div>

        <div class="signup-prompt">
          <span>{{ $t("new_to_gamestore") }}</span>
          <router-link to="/auth/register" class="btn-secondary">
            {{ $t("sign_up") }}
          </router-link>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";
import NavBar from "../components/NavBar.vue";
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";

const email = ref("");
const password = ref("");
const auth = useAuthStore();
const router = useRouter();

const isLogged = computed(() => !!auth.user);

async function submit() {
  await auth.login(email.value, password.value);
  // Redirect based on role
  if (auth.role === "manager") {
    router.push("/manager");
  } else {
    router.push("/");
  }
}
</script>

<style scoped>
.auth-page {
  background: #243248;
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
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
}

.auth-card {
  background: #141419;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
}

.field-label {
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
  color: #bbb;
}
.field-label.uppercase {
  text-transform: uppercase;
  margin-top: 1rem;
}

.auth-card input {
  background: #1f1f29;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  color: #eee;
  font-size: 1rem;
  margin-bottom: 1rem;
}
.auth-card input::placeholder {
  color: #555;
}

.btn-primary {
  margin-top: 1rem;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background: linear-gradient(135deg, #6eadef, #8d63ff);
  color: #f8f9fa;
  font-size: 1rem;
  cursor: pointer;
  transition: filter 0.2s;
}
.btn-primary:hover {
  filter: brightness(1.1);
}

.connected-box {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  background: #323a5a;
  color: #f8f9fa;
  font-size: 1rem;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.role-label {
  font-size: 0.95em;
  color: #b8eaff;
  margin-left: 0.5rem;
}

.signup-prompt {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
}
.btn-secondary {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: linear-gradient(135deg, #6eadef, #8d63ff);
  color: #f8f9fa;
  text-decoration: none;
  font-size: 0.9rem;
  cursor: pointer;
  transition: filter 0.2s;
}
.btn-secondary:hover {
  filter: brightness(1.1);
}
</style>
