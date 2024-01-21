<template>
  <div id="loading-state">
    <SearchBar 
      class="my-5"
      @startSearching="startSearching"
    />
    <div class="loader-card-container">
      <LoaderCard 
        v-for="i of 4" 
        :key="i"
        class="mb-5"
      />
    </div>
  </div>
</template>
  
<script>
  import LoaderCard from '../subComponents/LoaderCard.vue';
  import SearchBar from "../subComponents/SearchBar.vue";

  export default {
    name: 'LoadingState',

    components: {
      LoaderCard,
      SearchBar
    },

    methods: {
      startSearching(params) {
        this.$emit('startSearching', params);
      }
    }
  }
</script>
<style scoped lang="scss">
#loading-state {
  display: flex;
  flex-direction: column;

  .loader-card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
  