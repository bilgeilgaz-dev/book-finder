import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchKey: '',
    searchType: '',
  },
  getters: {
    getSearchKey: (state) => state.searchKey,
    getSearchType: (state) => state.searchType,
  },
  mutations: {
    setSearchKey(state, searchKey) {
      // eslint-disable-next-line no-param-reassign
      state.searchKey = searchKey;
    },
    setSearchType(state, searchType) {
      // eslint-disable-next-line no-param-reassign
      state.searchType = searchType;
    },
  },
  actions: {
  },
  modules: {
  },
});
