<template>
  <div
    id="search-bar" 
    :class="[
      'search-bar',
      {'landing-search-bar': isLandingPage},
      {'results-search-bar': !isLandingPage}
    ]"
  >
  <v-row class="mx-3 pb-2">
    <v-col cols="2" class="text-center" v-if="!isLandingPage">
      <v-img
        src="@/assets/Penguin_Random_House.png"
        class=""
        width="100"
      />
    </v-col>
    <v-col :cols="isLandingPage ? 12 : 8">
      <v-row class="toolbar-container">
        <v-col :cols="isLandingPage ? 12 : 9" class="">
          <v-toolbar 
            dense
            class="search-bar-toolbar"
          >
            <v-text-field 
              hide-details 
              single-line 
              :clearable="!isLandingPage"
              v-model="searchKey"
              placeholder="Search for a book title, author, or ISBN"
              class="mr-2"
            />
            <v-btn icon @click="search" :class="[isLandingPage ? 'landing-search-btn' : 'mr-2']">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>
        </v-col>
        <v-col :cols="isLandingPage ? 12 : 3">
          <v-row class="align-end select-search-text">
            <v-col
              v-if="isLandingPage"
              cols="3"
              offset="3"
            >
              <span >Search for a book by:</span>
            </v-col>
            <v-col :cols="isLandingPage ? 3 : 12">
              <v-select hide-details dense :items="SEARCH_TYPES" variant="underlined" v-model="searchType"></v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
    
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
  name: 'SearchBar',

  props: {
    state: {
      type: String,
      required: false,
      default: 'Results'
    }
  },

  data: () => ({
    searchKey: '',
    searchType: 'SMART'
  }),

  computed: {
    isLandingPage() {
      return this.state === 'Landing';
    }
  },

  methods: {
    search() {
      this.$emit('startSearching', {searchKey: this.searchKey, searchType: this.searchType});
    },
  },

  created() {
    this.SEARCH_TYPES = SEARCH_TYPES;
  },
}
</script>
<style scoped lang="scss">

.search-bar-toolbar {
  border-radius: 5px;
}
.landing-search-bar {
  display: flex;
  flex-direction: column;
  align-items: center;

  .select-search-text {
    color: #757575;
  }

  ::v-deep .v-toolbar__content {
    padding-right: 0;
  }

  .landing-search-btn {
    background-color: #FF6602;
    color: white;
    border-radius: 0 5px 5px 0;
  }
}

.results-search-bar {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2);

  .toolbar-container {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;

    .search-bar-toolbar {
      background-color: #f4f4f4;
      border-radius: 5px;
      ::v-deep .v-toolbar__content {
        display: flex;
        flex-direction: row-reverse;
        padding-left: 0;
      }
    }
    
  }
}

::v-deep .v-text-field > .v-input__control > .v-input__slot:before {
  border-style: none;
}

</style>
<style scoped lang="scss">
.v-list-item__title {
  color: #071F3F !important;
}
</style>
  