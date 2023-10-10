<template>
  <div>
    <div>
      <h1> {{ translations[locale].this_expressions['h1'] }} </h1>
      <div class="record" v-if="record">
        <div class="Id">{{ translations[locale].this_expressions['id'] }} {{ record._id }}</div>
        <div class="recordText"> {{ record.text }} </div>
        <div class="__v">{{ translations[locale].this_expressions['__v'] }} {{ record.__v }} </div>
        <div class="updateAt">{{ translations[locale].this_expressions['update'] }} {{ record.updatedAt }}</div>
        <div class="deleted">{{ translations[locale].this_expressions['deleted'] }} {{ record.deleted }}</div>
        <div class="source"> {{ translations[locale].this_expressions['source'] }} {{ record.source }}</div>
        <div class="type">{{ translations[locale].this_expressions['type'] }}{{ record.type }}</div>
        <div class="user">{{ translations[locale].this_expressions['user'] }}{{ record.user.name.first }} {{ record.user.name.last }}</div>
      </div>
      <v-btn @click="goBack">Go back</v-btn>
    </div>
   </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { CatFact, ThisExpressions, Translations } from '../interfaces'

let en_expressions: ThisExpressions = {
  "h1": "Cat Fact",
  "id": "ID: ",
  "user": "User: ",
  "update": "Update at: ",
  "__v": "__v: ",
  "deleted": "Deleted: ",
  "source": "Source: ",
  "type": "Type: "
};
let ru_expressions: ThisExpressions = {
  "h1": "Факт о кошках",
  "id": "ИД: ",
  "user": "Пользователь: ",
  "update": "Обнавлено: ",
  "__v": "__v: ",
  "deleted": "Удалено: ",
  "source": "Источник: ",
  "type": "Тип: "
};
export default Vue.extend({
  computed: {
    locale(): string {
      return this.$store.state.selected_locale;
    },
  },
  data() {
    return {
      record: null as CatFact | null,
      translations: {
        en: {
          this_expressions: en_expressions
        },
        ru: {
          this_expressions: ru_expressions
        }
      }as Translations
    }
  },
  methods: {
    goBack(): void {
      this.$router.push('/records')
    },
  },
  created() {
    const id = this.$route.params.id
    axios.get(`https://cat-fact.herokuapp.com/facts/${id}`)
      .then(response => {
        this.record = response.data
      })
  }
})
</script>

<style scoped>
.Id{
  margin-left: 200pt;
}
</style>