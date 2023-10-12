import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import axios from 'axios';
import { CatFact } from './interfaces';

Vue.use(Vuex);

interface State {
  selected_locale: string;
  records: CatFact[];
  loading: boolean;
  selectedCountRecords: number;
  listRecordsCounts: [10, 50, 100, 300, 500];
  currentPage: number;
  rowsPerPage:number;
}

const store: StoreOptions<State> = {
  state: {
    selected_locale: 'en',
    records: [],
    loading: false,
    selectedCountRecords: 10,
    listRecordsCounts: [10, 50, 100, 300, 500],
    currentPage: 1,
    rowsPerPage:10,
  },
  mutations: {
     setRowPerPage(state:State,count: number){
       state.rowsPerPage = count;
     },
    setCurrentPage(state:State, page:number) {
      state.currentPage = page;
    },
    setCountRecords(state: State, countRecords: number){
      state.selectedCountRecords = countRecords;
    },
    CHANGE_LOCALE(state: State, locale: string) {
      state.selected_locale = locale;
    },
    setRecords(state: State, records:CatFact[]) {
      state.records = records;
    },
    updateRecords(state: State, newRecords:CatFact[]) {
      state.records = newRecords;
    },
    setLoading(state: State, loading: boolean) {
      state.loading = loading;
    },
  },
  actions:{
    fetchData({ commit, state }) {
      commit('setLoading', true);
      axios.get('https://cat-fact.herokuapp.com/facts/random?amount='+this.state.selectedCountRecords)
        .then(response => {
          commit('setRecords', response.data);
        })
        .finally(() => {
          commit('setLoading', false);
        });
    },
  }
};

export default new Vuex.Store<State>(store);