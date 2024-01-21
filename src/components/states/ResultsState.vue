<template>
  <div id="results-state">
    <SearchBar 
      class="my-5"
      @startSearching="startSearching"
    />
    <div 
      v-if="booksList.exactMatch.length > 0"
      class="exact-match match-container"
    >
      <h5 class="mb-5 book-list-section">
        {{ $t('states.results.topResults', {results: booksList.exactMatch.length}) }}
      </h5>
      <div class="book-card-container">
        <BookCard
          v-for="(book, index) of booksList.exactMatch" 
          :book="book"
          :key="`exactMatch-${index}`"
          class="mb-5"
        />
      </div>
    </div>
    <div 
      class="all-matches match-container"
      v-if="booksList.allMatches.length > 0"
    >
      <h5 class="mb-5 book-list-section">{{ $t('states.results.related') }}</h5>
      <div class="book-card-container">
        <BookCard 
          v-for="(book, index) of booksList.allMatches" 
          :book="book"
          :key="`allMatches-${index}`"
          class="mb-5"
        />
      </div>
    </div>
    <div
      v-if="!booksList || (!booksList.exactMatch.length && !booksList.allMatches.length)"
      class="no-results book-card-container"
    >
      <h1 class="no-results">{{ $t('states.results.noResults') }}</h1>
    </div>
  </div>
</template>

<script>
import SearchBar from "../subComponents/SearchBar.vue";
import BookCard from "../subComponents/BookCard.vue";

export default {
  name: "ResultsState",

  props: {
    booksList: {
      type: Object,
      required: false,
      default: () => ({
        exactMatch: [],
        allMatches: []
      })
    }
  },

  components: { 
    SearchBar,
    BookCard
  },

  methods: {
    startSearching(params) {
      this.$emit("startSearching", params);
    }
  }
};
</script>
<style scoped lang="scss">
#results-state {
  display: flex;
  flex-direction: column;

  .book-card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .match-container {
    align-self: center;
  }

  .book-list-section {
    width: 850px;
  }

  .no-results {
    margin-top: 10%;
  }
}
</style>
