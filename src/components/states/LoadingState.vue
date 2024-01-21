<template>
  <div id="loading-state">
    <div class="search-bar mb-5">

    </div>
    <LoaderCard 
      v-for="i of 4" 
      :key="i"
      class="mb-5"
    />
    
  </div>
</template>
  
<script>
  import LoaderCard from '../subComponents/LoaderCard.vue';

  export default {
    name: 'LoadingState',

    components: {
      LoaderCard
    }
  }
</script>
<style scoped lang="scss">
#loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
  