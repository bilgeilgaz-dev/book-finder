<template>
  <div class="landing-page d-flex flex-column align-center">
    <h1 class="landing-page-title">BOOKS</h1>
    <p>PENGUIN RANDOM HOUSE</p>
    <SearchBar
      class="mt-5"
      :state="'Landing'"
      @startSearching="startSearching"
    />
  </div>
</template>

<script>
import SearchBar from '../subComponents/SearchBar.vue';

export default {
  name: 'LandingState',

  components: {
    SearchBar
  },

  data: () => ({
    searchKey: '',
    searchType: 'SMART'
  }),

  methods: {
    startSearching(params) {
      this.$emit('startSearching', params);
    },
  }
}
</script>
<style scoped lang="scss">
.landing-page {
  margin-top: 10%;

  .landing-page-title {
    font-size: 50px;
    color: #071F3F;
  }
}
</style>
