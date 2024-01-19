import Vue from 'vue'
import Vuex from 'vuex'
import announce from './modules/announce'
import application from './modules/application'
import authentication from './modules/authentication'
import city from './modules/city'
import external from './modules/external'
import session from './modules/session'
import user from './modules/user'
import home from './modules/home'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notifications: []
  },
  getters: {
    notifications: state => state.notifications
  },
  actions: {
    spawnNotification ({ commit, state, dispatch }, notification) {
      if (state.notifications.length > 0 &&
        state.notifications[state.notifications.length - 1].message === notification.message
      ) {
        return
      }

      const id = Math.floor(Math.random() * 100000)
      const newNotification = { id, ...notification }

      commit('add', newNotification)

      if (!newNotification.hasNoTimeout) {
        setTimeout(() => {
          dispatch('removeNotificationById', id)
        }, newNotification.timeToLive || 5000)
      }

      return newNotification
    },
    removeNotification ({ commit, state }, index) {
      if (!index) {
        commit('remove', state.notifications.length - 1)
      } else {
        commit('remove', index)
      }
    },
    removeNotificationById ({ commit, state }, id) {
      const index = state.notifications.findIndex(notification => notification.id === id)

      if (index !== -1) {
        commit('remove', index)
      }
    }
  },
  mutations: {
    add (state, payload) {
      state.notifications.push(payload)
    },
    remove (state, index) {
      state.notifications.splice(index, 1)
    }
  },
  modules: {
    announce,
    authentication,
    city,
    external,
    session,
    user,
    application,
    home
  }
})
