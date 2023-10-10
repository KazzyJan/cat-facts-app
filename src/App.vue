<template>
  <v-app>
    <v-app-bar
      app
      color="dark"
      dark
      >
      <v-btn @click="localeRu"> Русский язык</v-btn>
      <v-btn @click="localeEn"> English language</v-btn>
    </v-app-bar>
    <v-main> 
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { RootState } from './interfaces'


export default Vue.extend({
  
  name: 'App',
  computed: {
    locale(): string {
      return (this.$store.state as RootState).selected_locale;
    },
  },
  methods: {
    localeRu(): void {
      this.$store.commit('CHANGE_LOCALE', 'ru');
    },
    localeEn(): void {
      this.$store.commit('CHANGE_LOCALE', 'en');
    },
  },
});
</script>