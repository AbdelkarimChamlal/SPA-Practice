<script setup>
  import Article from '../components/Article.vue';
  import articles from '../stores/Articles.js';
  
</script>


<template>

    
  <main>
    <div class="hero">
      <div class="hero-image">
        <picture>
          <source srcset="../assets/image-web-3-mobile.jpg" media="(max-width: 1100px)" />
          <img src="/src/assets/image-web-3-desktop.jpg" alt="hero" />
        </picture>
      </div>

      <div class="hero-content">
        <div class="hero-title">
          The Bright Future of Web 3.0?
        </div>
        <div class="hero-text">
          We dive into the next evolution of the web that claims to put the power of the platforms back into the hands of the people. 
          But is it really fulfilling its promise?
          <a href="#" class="hero-button">Read more</a>
        </div>
      </div>
    </div>

    <div class="new-articles">
      <div class="new-articles-title">
        New
      </div>
      <Article v-for="article in articles" :key="article.id" :id="article.id" :headline="article.headline" :content="article.content" />
    </div>
    
  </main>
</template>



<style scoped>
  main{
    margin-top: 2rem;
  }

  .hero{
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }


  .hero-content{
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    height: 100%;
  }

  .hero-title{
    font-weight: 800;
    font-size: 3rem;
    line-height: 3rem;
  }

  .hero-text{
    font-weight: 400;
    font-size: 1rem;
    color: hsl(236, 13%, 42%);
    line-height: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .hero-button{
    background-color: hsl(5, 85%, 63%);
    padding: 1rem 2rem;
    font-size: 1rem;
    margin-top: 2rem;
    display: block;
    text-decoration: none;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    font-weight: 700;
    width: fit-content;
    color: hsl(36, 100%, 99%);
  }

  .hero-button:hover{
    background-color: hsl(240, 100%, 5%);
  }

  .new-articles{
    background-color: hsl(240, 100%, 5%);
    padding: 2rem 2rem 0 2rem;
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    gap: 1.5rem;
  }

  .new-articles-title{
    color: hsl(5, 85%, 63%);
    font-size: 2rem;
    font-weight: 700;
  }


@media screen and (min-width: 768px){

    main{
      display: flex;
      gap: 2rem;
    }

    .hero{
      width: 65%;
    }

    .new-articles{
      width: calc(35% - 2rem);
      margin-top: 0;
    }

    .hero-content{
      flex-direction: row;
      gap: 5rem;
    }

    .hero-title{
      width: 45%;
    }

    .hero-text{
      width: calc(55% - 2rem);
    }
}

</style>