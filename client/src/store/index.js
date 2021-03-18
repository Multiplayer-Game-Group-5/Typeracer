import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    word: '',
    users: []
  },
  mutations: {
    FETCH_USERS (state, payload) {
      state.users = payload
    },
    CHANGE_WORD (state, payload) {
      state.word = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
