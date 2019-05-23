import http from '../../api/http'

function token () {
  return localStorage.getItem('token')
}
export async function fetch ({ state, commit }) {
  const r = await http.get('/api/api/comment')
  if (r.status === 200) {
    commit('setList', r.data)
  }
}

export async function create ({ state, commit, dispatch }, { payload }) {
  http.defaults.headers.common['Authorization'] = 'Bearer ' + token()
  const r = await http.post('/api/api/comment', payload)
  if (r.status === 200) {
    dispatch('fetch')
  }
}

export async function update ({ state, commit, dispatch }, { id, payload }) {
  http.defaults.headers.common['Authorization'] = 'Bearer ' + token()
  const r = await http.put(`/api/api/comment/${id}`, payload)
  if (r.status === 200) {
    dispatch('fetch')
  }
}

export async function destroy ({ state, commit, dispatch }, { id }) {
  http.defaults.headers.common['Authorization'] = 'Bearer ' + token()
  const r = await http.delete(`/api/api/comment/${id}`, id)
  if (r.status === 200) {
    dispatch('fetch')
  }
}
