<script setup>
import { ref } from "vue";
</script>

<template>
  <section class="signup-section">
    <form>
      <div>
        <h2 class="login-title">Sign up</h2>
      </div>
      <div class="form-label">
        <label class="email-title"> Sign up With Email </label>
        <input type="email" id="email" name="email" placeholder="Email" required />
      </div>

      <div class="form-label">
        <label for="password" class="password-title">password </label>
        <input type="password" id="password" name="password" placeholder="Password" required />
      </div>

      <div class="form-label">
        <label for="confirm-password" class="password-title"> password </label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          placeholder="Confirm Password"
          required
        />
      </div>

      <div class="btn-signup">
        <button type="submit">Sign Up</button>
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
  gap: 2rem;
  width: 600px;
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
  padding: 1rem 2rem;
  border-radius: 6px;
  background: linear-gradient(to right, #06bfff, #2d73ff);
  color: #f8f9fa;
}
</style>
