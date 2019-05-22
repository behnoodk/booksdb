export default async ({ store }) => {
  try {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    if (token !== null) {
      store.commit('auth/setToken', token)
      store.commit('auth/setUser', user)
    }
  } catch (error) {
    // do nothing
  }
}
