import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import bigscreen from './modules/bigscreen'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    bigscreen
  },
  getters
})

export default store
