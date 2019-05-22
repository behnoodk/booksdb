import Vue from 'vue'
import Vuex from 'vuex'

import book from './book'
import auth from './auth'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    book,
    auth
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: debug
})
