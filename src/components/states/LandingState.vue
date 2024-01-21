<template>
  <div class="landing-page d-flex flex-column align-center">
    <h1 class="landing-page-title">{{ $t('states.landing.title') }}</h1>
    <p>{{ $t('states.landing.subTitle') }}</p>
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
    SearchBar,
  },

  methods: {
    startSearching(params) {
      this.$emit('startSearching', params);
    },
  },
};
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
