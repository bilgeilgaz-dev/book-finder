<template>
  <v-container>
    <v-btn @click="searchBy">
      Button
    </v-btn>
  </v-container>
</template>

<script>
import search from '@/utils/search';

export default {
  name: 'ResultsPage',

  data: () => ({
  }),

  methods: {
    async searchBy() {
      await search.search();
    },
  },
}
</script>
