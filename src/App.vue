<template>
  <v-app class="book-finder-container">
    <v-container class="app-container pa-0">
      <v-row class="fill-height pb-0 ma-0">
        <v-col cols="1" class="pa-0">
          <SideBar/>
        </v-col>
        <v-col cols="11" class="pa-0">
          <Component
            :is="currentState"
            :booksList="booksList"
            @startSearching="startSearching"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import SideBar from './components/SideBar.vue';
import search from './utils/search';

const req = require.context('./components/states', true, /\.(vue)$/i);
const states = {};

req.keys().map((key) => {
  const name = key.match(/\w+/)[0];
  states[name] = req(key).default;
  return states;
});

export default {
  name: 'App',

  components: {
    SideBar,
  },

  data: () => ({
    bookSearchState: 'LandingState',
    booksList: [],
  }),

  computed: {
    currentState() {
      return states[this.bookSearchState];
    },
  },

  methods: {
    async startSearching(params) {
      this.bookSearchState = 'LoadingState';
      this.booksList = await search.search(params.searchKey, params.searchType);
      this.bookSearchState = 'ResultsState';
    },
  },

  created() {
    this.$store.commit('setSearchKey', '');
    this.$store.commit('setSearchType', 'SMART');
  },
};
</script>
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=ubuntu');
.app-container {
  height: 100vh;
  max-width: none;
}
::v-deep .v-application {
  font-family: 'ubuntu', sans-serif;
}
</style>
