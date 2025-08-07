<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

import axios from "axios";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const router = useRouter();
const { t } = useI18n();

async function handleSignup(e) {
  e.preventDefault();
  error.value = "";

  if (password.value !== confirmPassword.value) {
    error.value = t("passwords_do_not_match");
    return;
  }
  try {
    // Adjust URL if your API is different
    await axios.post("/api/auth/register", {
      email: email.value,
      password: password.value,
    });
    // Optionally auto-login and/or redirect
    router.push("/login");
  } catch (err) {
    error.value = err?.response?.data?.message || t("registration_failed");
  }
}
</script>

<template>
  <section class="signup-section">
    <form @submit="handleSignup">
      <div>
        <h2 class="login-title">{{ $t("sign_up") }}</h2>
      </div>
      <div class="form-label">
        <label class="email-title">{{ $t("sign_up_with_email") }}</label>
        <input
          v-model="email"
          type="email"
          id="email"
          name="email"
          :placeholder="$t('email')"
          required
        />
      </div>

      <div class="form-label">
        <label for="password" class="password-title">{{ $t("password") }}</label>
        <input
          v-model="password"
          type="password"
          id="password"
          name="password"
          :placeholder="$t('password')"
          required
          autocomplete="new-password"
        />
      </div>

      <div class="form-label">
        <label for="confirm-password" class="password-title">{{ $t("confirm_password") }}</label>
        <input
          v-model="confirmPassword"
          type="password"
          id="confirm-password"
          name="confirm-password"
          :placeholder="$t('confirm_password')"
          required
          autocomplete="new-password"
        />
      </div>

      <div v-if="error" style="color: #ff5555; font-size: 1rem; margin-bottom: 1rem">
        {{ error }}
      </div>

      <div class="btn-signup">
        <button type="submit">{{ $t("sign_up") }}</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.signup-section {
  color: #f8f9fa;
  padding: 10rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #1b2838, #2a475e);
}

form {
  display: grid;
  gap: 1rem;
  width: 500px;
  background-color: #171a21;
  padding: 3rem;
  border-radius: 4px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
}

.login-title {
  font-size: 1.4rem;
  font-weight: bold;
}
.email-title {
  color: #1a9fff;
}
.password-title {
  text-transform: uppercase;
}
.form-label {
  font-weight: bold;
  font-size: 1.2rem;
}
label {
  display: block;
  margin-bottom: 1rem;
}

input[type="text"],
input[type="password"],
input[type="email"] {
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px;
  background: linear-gradient(to right, #36393f, #2c2f33);
  color: #f8f9fa;
  font-size: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.2s ease;
}

input[type="text"]:focus,
input[type="password"]:focus,
input[type="email"]:focus {
  box-shadow: 0 0 0 2px #66aaff;
}

.btn-signup {
  display: flex;
  justify-content: center;
}

.btn-signup button {
  cursor: pointer;
  background-color: #1a9fff;
  padding: 0.8rem 1.6rem;
  border-radius: 6px;
  background: linear-gradient(to right, #06bfff, #2d73ff);
  color: #f8f9fa;
}
</style>
