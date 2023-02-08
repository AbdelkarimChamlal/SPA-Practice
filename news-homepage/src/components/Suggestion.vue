<script setup>
const props = defineProps({
    id: String,
    title: String,
    content: String,
    image: String,
})
</script>

<template>
      <div class="suggestion">
        <div class="suggestion-cover">
          <img :src="image" alt="suggestion" />
        </div>
        <div class="suggestion-content">
          <div class="suggestion-order">
            {{ id }}
          </div>
          <a class="suggestion-title" href="#">
            {{ title }}
          </a>
          <div class="suggestion-text">
            {{ content }}
          </div>
        </div>
      </div>
</template>

<style scoped>
    .suggestion{
        display: flex;
        margin: 2rem 0;
        width: 100%;
        gap: 2rem;
    }

    .suggestion-cover{
        width: 25%;
    }

    .suggestion-cover img{
        width: 100%;
        height: auto;
    }

    .suggestion-content{
        width: calc(80% - 2rem);
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .suggestion-order{
        font-size:1.75rem;
        color: hsl(233, 8%, 79%);
        font-weight: 700;
    }

    .suggestion-title{
        font-size:1rem;
        font-weight: 800;
        text-decoration: none;
        color: hsl(240, 100%, 5%);
    }

    .suggestion-title:hover{
        color: hsl(5, 85%, 63%);
    }

    .suggestion-text{
        font-size:.9rem;
        color:hsl(236, 13%, 42%);
    }
</style>