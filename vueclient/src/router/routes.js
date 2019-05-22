import Login from 'pages/Login.vue'
import Register from 'pages/Register.vue'
import Index from 'pages/Index.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: Index,
        meta: { auth: false }
      },
      {
        path: 'login',
        name: 'login',
        component: Login,
        meta: { auth: false }
      },
      {
        path: 'register',
        name: 'register',
        component: Register,
        meta: { auth: true }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
