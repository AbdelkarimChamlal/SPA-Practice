<script setup>
  import Suggestion from '../components/Suggestion.vue';
  import suggestions from '../stores/Suggestions.js';
</script>



<template>
    <div class="suggestions">
        <Suggestion v-for="suggestion in suggestions" :key="suggestion.id" :id="suggestion.id" :title="suggestion.title" :content="suggestion.content" :image="suggestion.image" />
    </div>
</template>


<style scoped>
    @media screen and (min-width: 768px){
        .suggestions{
            display: flex;
            gap: 2rem;
        }
    }
</style>