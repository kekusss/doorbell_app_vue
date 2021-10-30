import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from './../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // lazy-loading
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('../views/Login.vue'),
    meta: {
      anonymousRequired: true,
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () => import('../views/Register.vue'),
    meta: {
      anonymousRequired: true,
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () =>
        import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    meta: {
      authRequired: true,
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (store.state.status.loggedIn) {
      next();
    } else {
      alert('You must be logged in to see this page');
      next({
        path: '/login',
      });
    }
  }
  else if((to.matched.some(record => record.meta.anonymousRequired))) {
    if (! store.state.status.loggedIn) {
      next();
    } else {
      next({
        path: '/dashboard',
      });
    }
  }
  else {
    next();
  }
});

export default router
