import Vue from 'vue'
import Vuex from 'vuex'

import book from './book'
import auth from './auth'
import author from './author'
import comment from './comment'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    book,
    auth,
    author,
    comment
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: debug
})
