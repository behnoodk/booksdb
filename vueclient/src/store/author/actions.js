import http from '../../api/http'

function token () {
  return localStorage.getItem('token')
}
export async function fetch ({ state, commit }) {
  const r = await http.get('/api/api/author')
  if (r.status === 200) {
    commit('setList', r.data)
  }
}

export async function create ({ state, commit, dispatch }, { payload }) {
  http.defaults.headers.common['Authorization'] = 'Bearer ' + token()
  const r = await http.post('/api/api/author', payload)
  if (r.status === 200) {
    dispatch('fetch')
  }
}

export async function update ({ state, commit, dispatch }, { id, payload }) {
  http.defaults.headers.common['Authorization'] = 'Bearer ' + token()
  const r = await http.put(`/api/api/author/${id}`, payload)
  if (r.status === 200) {
    dispatch('fetch')
  }
}

export async function destroy ({ state, commit, dispatch }, { id }) {
  http.defaults.headers.common['Authorization'] = 'Bearer ' + token()
  const r = await http.delete(`/api/api/author/${id}`, id)
  if (r.status === 200) {
    dispatch('fetch')
  }
}
