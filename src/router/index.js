import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../supabase/supabaseInit'
import Announces from '../views/Announces.vue'
import NewAnnounces from '../views/NewAnnounces.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ViewAnnounces from '../views/ViewAnnounces.vue'

const routes = [
  {
    path: '/',
    name: 'Announces',
    component: Announces,
    meta: {
      title: 'Anunțuri',
      auth: false,
    },
  },
  {
    path: '/new-announces',
    name: 'NewAnnounces',
    component: NewAnnounces,
    meta: {
      title: 'Anunț nou',
      auth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Autentificare',
      auth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Înregistrare',
      auth: false,
    },
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      title: 'Schimbare parolă',
      auth: false,
    },
  },
  {
    path: '/view-announces/:jobId',
    name: 'View-Announces',
    component: ViewAnnounces,
    meta: {
      title: 'Anunțuri pulicate',
      auth: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

//este folosita o functie pentru a putea exporta titlurile paginilor in functie de ruta pe care utilizatorul se afla
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | PerfectJOB`
  next()
})

//este folosita o metoda de aparare a rutelor ce trebuie autorizate
//mai exact, aceasta functie are rolul de a impiedica utilizatorii sa ajunga pe anumite pagini din aplicatie si permite accesul doar in conditiile in care acestia se autentifica
router.beforeEach((to, from, next) => {
  const user = supabase.auth.user()
  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      next()
      return
    }
    next({ name: 'Login' })
    return
  }
  next()
})

export default router
