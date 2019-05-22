import Vue from 'vue'
export function setUser (state, user) {
  localStorage.setItem('user', user)
  if (user === null) {
    localStorage.removeItem('user')
  }
  Vue.set(state, 'user', user)
}

export function setToken (state, token) {
  localStorage.setItem('token', token)
  if (token === null) {
    localStorage.removeItem('token')
  }
  Vue.set(state, 'token', token)
}
