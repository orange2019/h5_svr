import Vue from 'vue'
import Vuex from 'vuex'
import STATE from './state'
import ACTIONS from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state() {
    return STATE
  },
  mutations: {

  },
  actions: ACTIONS
})

export function createStore() {
  return store
}