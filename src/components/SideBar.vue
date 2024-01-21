<template>
  <v-card
    class="side-stepper fill-height justify-center"
  >
    <v-navigation-drawer
      permanent
      color="#071F3F"
    >
      <v-list>
        <v-list-item class="justify-center">
          <img 
            class="my-2"
            width="50px"
            src="../assets/Penguin_logo.png"
          />
        </v-list-item>
        <v-list-item :class="['justify-center', {'selected': isSearchSelected}]" dense>
          <v-list-item-icon class="mx-0">
            <v-icon color="white">mdi-magnify</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item class="justify-center" dense>
          <v-list-item-icon class="mx-0">
            <v-icon color="grey">mdi-help-circle</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list-item class="justify-center">
          <v-list-item-icon class="mx-0">
            <v-icon color="grey">mdi-logout</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item class="justify-center mb-2">
          <v-list-item-avatar class="mx-0">
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>
        </v-list-item>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  export default {
    name: 'SideBar',

    data: () => ({
      isSearchSelected: true,
    }),
  }
</script>
<style scoped lang="scss">
.side-stepper {
  background-color: #071F3F;
}
  .selected {
    border-left: #FF6602 2px solid;
  }
</style>
