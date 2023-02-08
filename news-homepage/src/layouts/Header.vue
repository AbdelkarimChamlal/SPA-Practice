<script setup>
import { ref } from 'vue';


const mobileMenu = ref(false);

const toggleMenu = () => {
  mobileMenu.value = !mobileMenu.value;
}

const mobileNavClicked = (event) => {

  if (event.target.classList == 'mobile-nav') {
    toggleMenu();
  }
}

</script>


<template>
<header class="navbar">
    <div class="logo">
      <img src="/src/assets/logo.svg" alt="logo" />
    </div>
    <div class="mobile-menu" @click="toggleMenu">
      <img src="/src/assets/icon-menu.svg" alt="menu" />
    </div>
    <div class="nav">
      <a href="#">Home</a>
      <a href="#">New</a>
      <a href="#">Popular</a>
      <a href="#">Trending</a>
      <a href="#">Categories</a>
    </div>
  </header>

  <div class="mobile-nav" v-if="mobileMenu" @click="mobileNavClicked">
    <div class="mobile-menu-container">
      <div class="mobile-close-menu" @click="toggleMenu">
        <img src="/src/assets/icon-menu-close.svg" alt="menu" />
      </div>
      <div class="mobile-nav-links">
        <a href="#" @click="toggleMenu">Home</a>
        <a href="#" @click="toggleMenu">New</a>
        <a href="#" @click="toggleMenu">Popular</a>
        <a href="#" @click="toggleMenu">Trending</a>
        <a href="#" @click="toggleMenu">Categories</a>
      </div>
    </div>
  </div>
</template>


<style scoped>


.navbar{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav{
  display: none;
}

.mobile-menu img{
  width: 3.5rem;
  cursor: pointer;
}

.mobile-nav{
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #5a5a5aa5;
  overflow: hidden;
  z-index: 100;
}


.mobile-close-menu{
  margin-top: 0.54rem;
  margin-left: auto;
  cursor: pointer;
  display: grid;
  place-items: center;
  width: 3rem;
}

.mobile-close-menu img{
  width: 2.5rem;
}

.mobile-nav-links{
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 1.5rem;
}

.mobile-nav-links a{
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  color: hsl(236, 13%, 42%);
  margin: .25rem 0;
}


.mobile-menu-container{
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-left: auto;
  width: max(70%, 10rem);
  height: 100%;
  padding: 2rem;
  background-color: hsl(36, 100%, 99%);
}


@media (min-width: 768px){
    .mobile-nav{
        display: none;
    }

    .mobile-menu-container{
        display: none;
    }

    .mobile-menu{
        display: none;
    }

    .nav{
        display: flex;
        gap: 3rem;
    }

    .nav a{
        text-decoration: none;
        color: hsl(236, 13%, 42%);
        font-size: 1rem;
        font-weight: 700;
    }

    .nav a:hover{
        color: hsl(5, 85%, 63%);
    }
}

</style>