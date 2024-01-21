import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchKey: '',
  },
  getters: {
    getSearchKey: state => state.searchKey,
  },
  mutations: {
    setSearchKey(state, searchKey) {
      state.searchKey = searchKey;
    }
  },
  actions: {
  },
  modules: {
  }
})
