<script setup></script>

<template>
  <section class="game-section">
    <div class="main-container">
      <div class="gallery-container">
        <div>
          <img src="../assets//pictures/img-1.jpg" alt="" />
        </div>
        <div class="image-container">
          <div class="gallery-img-container">
            <img src="../assets//pictures/img-1.jpg" alt="" />
          </div>
          <div class="gallery-img-container">
            <img src="../assets//pictures/img-2.jpg" alt="" />
          </div>
          <div class="gallery-img-container">
            <img src="../assets//pictures/img-3.jpg" alt="" />
          </div>
          <div class="gallery-img-container">
            <img src="../assets//pictures/img-4.jpg" alt="" />
          </div>
          <div class="gallery-img-container">
            <img src="../assets//pictures/img-5.jpg" alt="" />
          </div>
        </div>
      </div>
      <div class="card">
        <div class="game-details">
          <img src="../assets/pictures/game-1.jpg" alt="Arma3" />
        </div>
        <div class="game-picture">
          <h2></h2>
        </div>
        <p></p>
        <div class="game-description"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.game-section {
  background: linear-gradient(to bottom, #1b2838, #2a475e);
  height: 100vh;
  /* justify-content: center; */
  align-content: center;
}

.main-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
}
.gallery-container {
  display: grid;
  gap: 2rem;
  background-color: #1864ab;
  border-radius: 4px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
}
.card {
  display: grid;
  gap: 2rem;
  background-color: #1864ab;
  border-radius: 4px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
}

.image-container {
  display: flex;
}
img {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
}
</style>
