import Vue from 'vue'
import Vuex from 'vuex'
import song from './song.store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    song
  }
})

export default store
