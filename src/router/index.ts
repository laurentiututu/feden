import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
const Home = () =>
  import(/* webpackChunkName: "vsf-home" */ '../views/Home.vue');
const Login = () =>
  import(/* webpackChunkName: "vsf-login" */ '../views/Login.vue');
const NewAnnounce = () =>
  import(/* webpackChunkName: "vsf-new-announce" */ '../views/NewAnnounce.vue');
const Announces = () =>
  import(/* webpackChunkName: "vsf-announces" */ '../views/Announces.vue');
const UserAnnounces = () =>
  import(/* webpackChunkName: "vsf-user-announces" */ '../views/UserAnnounces.vue');
const Announce = () =>
  import(/* webpackChunkName: "vsf-announce" */ '../views/Announce.vue');
const UserAnnounce = () =>
  import(/* webpackChunkName: "vsf-user-announce" */ '../views/UserAnnounce.vue');
const MyAccount = () =>
  import(/* webpackChunkName: "vsf-my-account" */ '../views/MyAccount.vue');

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { name: 'Home', path: '/', component: Home },
  { name: 'NewAnnounce', path: '/anunt-nou', component: NewAnnounce },
  { name: 'Announces', path: '/anunturi/:p', component: Announces },
  { name: 'UserAnnounces', path: '/utilizatori/:slug', component: UserAnnounces },
  { name: 'Announce', path: '/anunturi/:p/:c', component: Announce },
  {
    name: 'UserAnnounce',
    path: '/contul-meu/anunturi/:id',
    component: UserAnnounce,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token') !== null) {
        next();
      } else {
        next('/');
      }
    }
  },
  { 
    name: 'MyAccount',
    path: '/contul-meu',
    component: MyAccount,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token') !== null) {
        next();
      } else {
        next('/autentificare');
      }
    }
  },
  { 
    name: 'Login',
    path: '/autentificare',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token') === null) {
        next();
      } else {
        next('/contul-meu');
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
