<template>
  <div>
    <h1> {{ translations[locale].this_expressions['h1'] }} </h1>
    <v-progress-linear v-if="loading" indeterminate color="green"></v-progress-linear>
    <v-btn
    v-if="!loading"
    @click="$store.dispatch('fetchData')">{{ translations[locale].this_expressions['update'] }}</v-btn>
    <label for="quantity">{{ translations[locale].this_expressions['numOfRec'] }} </label>
    <select id="quantity" v-model="$store.state.selectedCountRecords">
      <option v-for="quantity in $store.state.listRecordsCounts" :key="quantity" :value="quantity">{{ quantity }}</option>
    </select>
    <loading v-if="loading">{{ translations[locale].this_expressions['loading'] }}</loading>
    <v-data-table
      v-if="!loading"
      :headers="headers"
      :items="records"
      :page.sync="currentPage"
      item-key="_id"
    >
      <template v-slot:item.text="{ item }">
          <span>{{ slice(item.text, 50) }}</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn @click="goToRecord(item._id)" text>
            {{ translations[locale].this_expressions['more'] }}
          </v-btn>
        </template>
      </v-data-table>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    // import { Translations } from '../interfaces'
    import { VAlert, VBtn, VDataTable } from 'vuetify/lib'

  let en_expressions: { [key: string]: string } = {
    "h1": "Cat Facts",
    "record": "Fact",
    "more": "More",
    "goto_rec": "Go to Record",
    "loading": "Please, wait",
    "update": "Update",
    "numOfRec": "Number of records"
  };
  let ru_expressions: { [key: string]: string } = {
    "h1": "Факты о кошках",
    "record": "Факт",
    "more": "Подробнее",
    "goto_rec": "Перейти к статье",
    "loading": "Пожалуйста, подождите",
    "update": "Обновить данные",
    "numOfRec": "Количество записей"
  };
  let translations: {
    en: {
    this_expressions: { [key: string]: string }
    },
    ru: {
      this_expressions: { [key: string]: string }
    }
    } = {
    en: {
      this_expressions: en_expressions
    },
    ru: {
      this_expressions: ru_expressions
    }
  };
    export default Vue.extend({
      computed: {
        currentPage: {
          get() {
            return this.$store.state.currentPage
          },
          set(page) {
            this.$store.commit('setCurrentPage', page)
          }
        },
        locale: function() {
          return this.$store.state.selected_locale;
        },
        loading() {
          return this.$store.state.loading;
        },
        records() {
          return this.$store.state.records;
        },
        headers(): { text: string, value: string, sortable?:boolean, fixed?: boolean, width?: number }[] {
      if (this.translations && this.locale) {
        return [
          { text: this.translations[this.locale].this_expressions['record'], value: 'text', fixed: true, width: 1000},
          { text: this.translations[this.locale].this_expressions['more'], value: 'actions', sortable: false}, 
        ]
      } else {
        return [];

        }
      },
    },
      components: {
    VDataTable,
    VBtn
    },
    mounted() {
    this.currentPage = localStorage.getItem('currentPage') || 1
    },
    watch: {
      currentPage(page) {
        localStorage.setItem('currentPage', page)
      }
    },
    data() {
      return {
        translations: {
          en: {
            this_expressions: en_expressions
          },
          ru: {
            this_expressions: ru_expressions
          }
         }as {
           [key: string]: {
             this_expressions: { [key: string]: string };
           };
         },
        }
      },
      methods: {
        setCountRecords(){
        this.$store.commit("setCountRecords", this.$store.state.selectedCountRecords)
      },
        goToRecord(id: string) {
          this.$router.push(`/record/${id}`);
        },
        slice(value: string ,maxLenght: number){
          if(value.length>50){ return value.slice(0, maxLenght) + "..."}
          else {return value}
        },
      },
      created() {
        if (this.$store.state.records.length == 0) {
          this.$store.dispatch('fetchData');
        }
      }
    })   
    </script>

<style scoped>
h2 {
  color: #333;
}
</style>