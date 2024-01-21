<template>
  <div class="landing-page d-flex flex-column align-center">
    <h1 class="landing-page-title">BOOKS</h1>
    <p>PENGUIN RANDOM HOUSE</p>
    <v-toolbar
      dense
    >
      <v-text-field
        hide-details
        single-line
        v-model="searchKey"
      />

      <v-btn icon @click="search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
    <div class="d-flex mt-4 align-end">
      <span>Search for a book by:</span>
      <v-select
        hide-details
        dense
        :items="SEARCH_TYPES"
        variant="underlined"
        v-model="searchType"
      ></v-select>
    </div>
  </div>
</template>

<script>

const SEARCH_TYPES = [
  'SMART',
  'TITLE',
  'AUTHOR',
  'ISBN'
];

export default {
  name: 'LandingState',

  data: () => ({
    searchKey: '',
    searchType: 'SMART',
    isLoading: false,
  }),

  watch: {
    isLoading() {
      console.log('watch isLoading', this.isLoading);
      //this.$emit('updateState', this.isLoading ? 'LoadingState' : 'ResultsState');
    }
  },

  methods: {
    search() {
      this.$emit('startSearch');
    },
  },

  created() {
    this.SEARCH_TYPES = SEARCH_TYPES;
  },
}
</script>
<style scoped lang="scss">
.landing-page {
  margin-top: 20%;

  .landing-page-title {
    font-size: 50px;
    color: #071F3F;
  }
}
</style>
