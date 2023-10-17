<template>
  <header>
    <v-app>
      <v-app-bar
        app
        color="dark"
        dark
        >
        <v-row class="justify-end">
          <v-btn @click="localeRu"> Русский язык</v-btn>
          <v-btn @click="localeEn"> English language</v-btn>
        </v-row>
      </v-app-bar>
      <v-main> 
        <router-view/>
      </v-main>
    </v-app>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { RootState } from './interfaces'


export default Vue.extend({
  
  name: 'App',
  render(h) {
    return h('div', 'Hello World');
  },
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