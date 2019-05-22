import Vue from 'vue'
export function setList (state, list) {
  Vue.set(state, 'list', list)
}
