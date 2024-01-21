<template>
  <v-app>
    <v-container class="app-container pa-0">
      <v-row class="fill-height pb-0 ma-0">
        <v-col cols="1" class="pa-0">
          <SideBar/>
        </v-col>
        <v-col cols="11" class="pa-0">
          <Component
            :is="currentState"
            :bookSearchState="bookSearchState"
            :booksList="booksList"
            @startSearch="startSearch()"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import SideBar from './components/SideBar.vue';
import search from '@/utils/search';
const req = require.context('./components/states', true, /\.(vue)$/i);
const states = {};

req.keys().map(key => {
  const name = key.match(/\w+/)[0];
  states[name] = req(key).default;
});

export default {
  name: 'App',

  components: {
    SideBar
  },

  watch: {
    bookSearchState() {
      console.log('watch bookSearchState', this.bookSearchState);
    },

    booksList() {
      console.log('watch booksList', this.booksList);
    }
  },

  data: () => ({
    bookSearchState: 'LandingState',
    booksList: []
  }),

  computed: {
    currentState() {
      console.log('pages', states);
      console.log('currentState bookSearchState', this.bookSearchState);
      return states[this.bookSearchState];
    }
  },

  methods: {
    async startSearch() {
      console.log('startSearch');
      this.bookSearchState = 'LoadingState';
      this.booksList = await search.search(this.searchKey, this.searchType);
      this.bookSearchState = 'ResultsState';
    }
  }
};
</script>
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=ubuntu');
.app-container {
  height: 100vh;
  max-width: none;
}
.v-application {
  font-family: 'ubuntu', sans-serif;
}
</style>
