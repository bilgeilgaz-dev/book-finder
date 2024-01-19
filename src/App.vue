<template>
  <v-app>
    <SideBar />
    <v-main>
      <LandingPage/>
    </v-main>
  </v-app>
</template>

<script>
import LandingPage from './components/LandingPage.vue';
import SideBar from './components/SideBar.vue';

export default {
  name: 'App',

  components: {
    SideBar,
    LandingPage
},

  data: () => ({
    //
  }),
};
</script>
