import Login from 'pages/Login.vue'
import Register from 'pages/Register.vue'
import Index from 'pages/Index.vue'
import BookForm from 'pages/BookForm.vue'
import AuthorForm from 'pages/AuthorForm.vue'
import AuthorIndex from 'pages/AuthorIndex.vue'
import BookDetail from 'pages/BookDetail.vue'

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
        meta: { auth: false }
      },
      {
        path: 'authors',
        name: 'authors',
        component: AuthorIndex,
        meta: { auth: false }
      },
      {
        path: 'authors/new',
        name: 'authornew',
        component: AuthorForm,
        meta: { auth: true }
      },
      {
        path: 'authors/:id/edit',
        name: 'authoredit',
        component: AuthorForm,
        meta: { auth: true }
      },
      {
        path: 'books/new',
        name: 'booknew',
        component: BookForm,
        meta: { auth: true }
      },
      {
        path: 'books/:id/edit',
        name: 'bookedit',
        component: BookForm,
        meta: { auth: true }
      },
      {
        path: 'books/:id/detail',
        name: 'bookdetail',
        component: BookDetail,
        meta: { auth: false }
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
