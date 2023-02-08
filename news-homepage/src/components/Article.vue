<script setup>

const props = defineProps({
    id: Number,
    headline: String,
    content: String
})


</script>

<template>

<div class="article">
    <div class="article">
        <a href="#">{{headline}}</a>
        <p>{{content}}</p>
    </div>
</div>

</template>


<style scoped>
  .article{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 2rem;
    border-bottom: solid 1px hsl(233, 8%, 79%);
  }

  .article:last-child{
    border-bottom: none;
  }

  .article a{
    font-size: 1.25rem;
    text-decoration: none;
    font-weight: 800;
    color: hsl(36, 100%, 99%);
  }


  .article a:hover{
    color: hsl(5, 85%, 63%);
  }

  .article p{
    color: hsl(233, 8%, 79%);
    line-height: 1.5rem;
  }
</style>