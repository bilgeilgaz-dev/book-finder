<template>
  <v-card elevation="6" height="90" width="850">
    <v-row>
      <v-col cols="2" class="pb-0">
        <v-skeleton-loader
          type="image"
          transition="scale-transition"
          :loading="true"
          max-height="90"
          width="90"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="9" class="pr-2">
        <v-row class="justify-space-between">
          <v-col cols="7" class="pb-0">
            <v-skeleton-loader
              type="list-item-two-line"
              transition="scale-transition"
              :loading="true"
              max-height="50"
            ></v-skeleton-loader>
          </v-col>
          <v-col cols="2" class="mt-3">
            <v-skeleton-loader
              type="text"
              transition="scale-transition"
              :loading="true"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row class="pl-4">
          <v-col cols="2">
            <v-skeleton-loader
              type="text"
              transition="scale-transition"
              :loading="true"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'LoaderCard',

  data: () => ({}),
};
</script>
<style scoped lang="scss">
@media screen and (min-width: 610px) and (max-width: 950px) {
  .v-card {
    width: 550px !important;
  }
}

@media screen and (min-width: 450px) and (max-width: 610px) {
  .v-card {
    width: 400px !important;
    height: 130px !important;
  }
}

@media screen and (max-width: 450px) {
  .v-card {
    width: 300px !important;
    height: 130px !important;
  }
}
</style>
