<template>
    <div>
      <h1> {{ translations[locale].this_expressions['h1'] }} </h1>
      <div v-if="!record">
        <v-progress-linear class="progress-linear" indeterminate color="green" height="10"></v-progress-linear>
        <loading class="loading">{{ translations[locale].this_expressions['loading'] }}</loading>
      </div>

      <div class="record" v-if="record"> 
        <div class="user">{{ translations[locale].this_expressions['user'] }}{{ record.user.name.first }} {{ record.user.name.last }}</div>
        <div class="recordText"> {{ record.text }} </div> 
        <div class="infBlock">
          <div class="addInfBlock">
            <div class="Id">{{ translations[locale].this_expressions['id'] }} {{ record._id }}</div>
            <div class="updateAt">{{ translations[locale].this_expressions['update'] }} {{ record.updatedAt }}</div>
            <div class="source"> {{ translations[locale].this_expressions['source'] }} {{source}}</div>
          </div>
          <div class="otherInf">
            <div class="__v">{{ translations[locale].this_expressions['__v'] }} {{ record.__v }} </div>
            <div class="deleted">{{ translations[locale].this_expressions['deleted'] }} {{ record.deleted }}</div>
            <div class="type">{{ translations[locale].this_expressions['type'] }}{{ record.type }}</div>
          </div>
          <v-btn class="backButton" @click="goBack">{{ translations[locale].this_expressions['goBack'] }}</v-btn>
        </div>
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
  "type": "Type: ",
  "loading": "Loading",
  "goBack": "Go back"
};
let ru_expressions: ThisExpressions = {
  "h1": "Факт о кошках",
  "id": "ИД: ",
  "user": "Пользователь: ",
  "update": "Обнавлено: ",
  "__v": "__v: ",
  "deleted": "Удалено: ",
  "source": "Источник: ",
  "type": "Тип: ",
  "loading": "Загрузка",
  "goBack": "Назад"
};
export default Vue.extend({
  computed: {
    locale(): string {
      return this.$store.state.selected_locale;
    },
    loading(): boolean {
        return this.$store.state.loading;
    },
    source(): string | undefined{
      if(this.record?.source == null) {
        if (this.locale == 'ru'){
          return "Не указано"
        }
        else{
          return "Not specified"
        }
      }
      else{
        return this.record?.source
      }
    }
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
      // this.$router.push('/records')
      window.history.back();
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
h1{
  padding-left: 5%;
  background-color: #d7d7d7;
}

.loading{
  text-align: center;
  display: block;
}
.record{
  display: inline-block;
  width: 100%;
}

.Id{
  padding-top: 15px;
  margin-left: 5%;
  float: left ;
  display: block;
}

.__v{
  padding-top: 15px;
}

.recordText{
  display: block;
  text-align: center;
  font-size: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 15px;
  min-height: 360px;
  background-color: #ececec;
}

.user{
  font-size: 25px;
  display: block;
  padding-left: 5%;
  padding-top: 30px;
  padding-bottom: 15px;
  background-color: #d7d7d7 ;
}

.updateAt{
  display: block;
  float: left;
  margin-left: 5%;
  margin-top: 15px;
}

.source{
  display: block;
  float: left;
  clear: right;
  margin-left: 5%;
  margin-top: 15px;
}

.addInfBlock{
  float:right;
  display: block;
  width: 350px;
}

.otherInf{
  display: block;
  margin-left: 5%;
}

.backButton{
  display: block;
  float: left;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left:15% ;
}

.deleted{
  margin-top: 15px;
}

.type{
  margin-top: 15px;
}

.infBlock{
  height: 200px;
  background-color: #d7d7d7;
}
</style>