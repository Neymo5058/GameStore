<script setup></script>

<template>
  <footer class="footer">
    <div class="footer__section">
      <div class="footer__content">
        <h3 class="footer__title">About</h3>
        <p>GameStore is an online platform for buying digital video games.</p>
      </div>
      <div class="footer__content">
        <h3 class="footer__title">Contact</h3>
        <p>contact@gamestore.com</p>
        <p>+1 (888) 123-4567</p>
        <p>123 5e rue Shawinigan, QC, Canada</p>
      </div>
      <div class="footer__content">
        <h3 class="footer__title">Terms · Privacy</h3>
        <p>© 2025 GameStore</p>
      </div>
      <div class="footer__content">
        <h3 class="footer__title">Social Media</h3>
        <div class="icons-footer">
          <ion-icon class="icon-footer" name="logo-instagram"></ion-icon>
          <ion-icon class="icon-footer" name="logo-twitter"></ion-icon>
          <ion-icon class="icon-footer" name="logo-discord"></ion-icon>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #171a21;
  padding: 2rem 1rem;
}
.footer__section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 2rem;
  color: #f8f9fa;
  justify-items: center;
}
.footer__title {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
.footer__content {
  align-items: center;
  text-align: left;
}
.footer__content p {
  font-size: 0.9rem;
}

.icons-footer {
  display: flex;
  gap: 1rem;
}
.icon-footer {
  font-size: 2rem;
}
</style>
