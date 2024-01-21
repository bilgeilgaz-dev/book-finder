<template>
    <v-card elevation="6" height="90" width="850">
      <v-row>
        <v-col cols="2" class="pb-0 pr-0">
          <v-img
            :src="bookCoverFoto"
            height="90"
            width="90"
            class="pa-0"
          />
        </v-col>
        <v-col cols="10" class="pl-0">
          <v-row class="justify-space-between">
            <v-col cols="7" class="pt-5 pb-2">
                <v-row>
                    <v-col cols="12" class="pb-0">
                        {{ book.title }}
                    </v-col>
                    <v-col cols="12" class="pt-0 grey-text">
                        {{ book.author }}
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="2" class="mt-3">
              {{ `$ ${bookPrice}` }}
            </v-col>
          </v-row>
          <v-row class="pl-3 grey-text">
            <span> {{ `ISBN ${book.isbn}` }}</span>
            <v-icon>mdi-circle-small</v-icon>
            <span> {{ book.division.description }}</span>
            <v-icon>mdi-circle-small</v-icon>
            <span> {{ book.consumerFormat }}</span>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </template>
  
  <script>
  export default {
    name: "BookCard",
  
    props: {
      book: {
        type: Object,
        required: true
      }
    },

    computed: {
      bookPrice() {
        return this.book.price?.find(price => price.currencyCode === 'USD').amount;
      },

      bookCoverFoto() {
        return this.book._links?.find(link => link.rel === 'icon')?.href;
      }
    },

    created() {
      console.log('BookCard created', this.book);
    }
  };
  </script>
  <style scoped lang="scss">
  .grey-text {
    color: #757575;
    font-size: 14px;
  }
</style>
  