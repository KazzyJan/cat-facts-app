<template>
  <div>
    <h1> {{ translations[locale].this_expressions['h1'] }} </h1>
    <v-progress-linear class="progress-linear" v-if="loading" indeterminate color="green" height="10"></v-progress-linear>
    <div v-if="!loading">
      <v-btn
      class="updateButton"
      @click="updateRecords">{{ translations[locale].this_expressions['update'] }}</v-btn>
      <div class="numOfRec">
        <label for="quantity">{{ translations[locale].this_expressions['numOfRec'] }} </label>
        <select id="quantity" v-model="$store.state.selectedCountRecords">
          <option v-for="quantity in $store.state.listRecordsCounts" :key="quantity" :value="quantity">{{ quantity }}</option>
        </select>
      </div>
    </div>
    <div>
      <loading class="loading" v-if="loading">{{ translations[locale].this_expressions['loading'] }}</loading>
      <v-data-table
        class="table"
        v-else
        :items-per-page.sync= $store.state.rowsPerPage
        :headers="headers"
        :items="records"
        :page.sync="currentPage"
        item-key="_id"
      >
        <template v-slot:item.text="{ item }">
          <span class="recordColumn">{{ slice(item, 100) }}</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn class="moreButton" @click="goToRecord(item._id)" text>
            {{ translations[locale].this_expressions['more'] }}
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { CatFact, ThisExpressions, Translations } from '../interfaces'
    import { VBtn, VDataTable } from 'vuetify/lib'

  let en_expressions: ThisExpressions = {
    "h1": "Cat Facts",
    "record": "Fact",
    "more": "More",
    "goto_rec": "Go to Record",
    "loading": "Please, wait",
    "update": "Update",
    "numOfRec": "Number of records"
  };
  let ru_expressions: ThisExpressions = {
    "h1": "Факты о кошках",
    "record": "Факт",
    "more": "Подробнее",
    "goto_rec": "Перейти к статье",
    "loading": "Пожалуйста, подождите",
    "update": "Обновить данные",
    "numOfRec": "Количество записей"
  };
  let translations: Translations = {
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
          get(): number {
            return this.$store.state.currentPage
          },
          set(page: number): void {
            this.$store.commit('setCurrentPage', page)
          }
        },
        locale: function():string {
          return this.$store.state.selected_locale;
        },
        loading(): boolean {
          return this.$store.state.loading;
        },
        records(): CatFact[]{
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
    this.currentPage = Number(localStorage.getItem('currentPage') || 1)
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
          } as Translations
        }
      },
      methods: {
        setCountRecords(): void{
        this.$store.commit("setCountRecords", this.$store.state.selectedCountRecords)
      },
        goToRecord(id: string): void {
          this.$router.push(`/record/${id}`);
        },
        slice(item: CatFact ,maxLenght: number): string{
          if(item.text.length>50){ return item.text.slice(0, maxLenght) + "..."}
          else {return item.text}
        },
        updateRecords(): void{
        this.$store.dispatch('fetchData');
        this.$store.commit('setCurrentPage', 0);
        }
      },
      created() {
        if (this.$store.state.records.length == 0) {
          this.$store.dispatch('fetchData');
        }
      }
    })
    </script>

<style scoped>
h1 {
  color: #000000;
  text-align: center;
  width: 100%;
}

label {
  margin-bottom: 10px;
}

select {
  width: 40px;
  border: 1px solid #4f4f4f;
  border-radius: 4px;
  text-align: center;
}

.progress-linear{
  line-height: 40px;
}


.updateButton{
  display: block;
  float: right;
  margin-right: 75px;
}

.table{
  margin-top: 25px;
}

.numOfRec{
  display: inline-block;
  margin-left: 50px;
  margin-top: 10px;
}

.recordColumn{
  margin-left: 20px;
}

.moreButton{
  margin-left: 100px;
}

.table.th{
  padding-left: 100px;
  text-align: left;
}

.loading{
  display: block;
  text-align: center;
  width: 100%;
}


</style>