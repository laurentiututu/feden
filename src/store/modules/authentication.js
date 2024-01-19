import config from '../resources/endpoints/authentication.json'
import axios from 'axios'
import { vm } from '@/main'

const state = {
  userData: {}
}
const getters = {
  getUserData: state => state.userData
}
const actions = {
	async login({ commit, dispatch }, credentials) {
  	await axios
    .post(config.login, credentials)
    .then(response => {
    	console.log(response)
    	let user = {
        name: response.data.data.user.name,
        email: response.data.data.user.email,
        slug: response.data.data.user.slug,
        role: response.data.data.user.role
      }
      localStorage.setItem('token', response.data.data.accessToken)
      localStorage.setItem('refresh_token', response.data.data.refreshToken)
      localStorage.setItem('user', JSON.stringify(user))
  	  commit('setUserData', response.data.data.user)
      dispatch('spawnNotification', {
        type: 'success',
        message: 'Te-ai conectat cu succes.',
        action1: { label: 'OK' }
      });
      window.dispatchEvent(new Event("storage"))
      vm.$router.go(-1)
    })
    .catch(error => {
      dispatch('spawnNotification', {
        type: 'danger',
        message: error.response.data.message,
        action1: { label: 'OK' }
      });
    })
  },
  async logout({ commit }) {
  	await axios
  	.post(config.logout)
  	.then(() => {
  		localStorage.removeItem('token')
  		localStorage.removeItem('refresh_token')
  		localStorage.removeItem('user')
  		window.dispatchEvent(new Event("storage"))
  	})
  	.catch(error => {
  		console.log(error)
  	})
  },
  async register({ dispatch }, credentials) {
    await axios
    .post(config.register, credentials)
    .then(response => {
      dispatch('spawnNotification', {
        type: 'success',
        message: response.data.message,
        action1: { label: 'OK' }
      });
    })
    .catch(error => {
      dispatch('spawnNotification', {
        type: 'danger',
        message: error.response.data.message,
        action1: { label: 'OK' }
      });
    })
  },
  async forgotPassword({ commit, dispatch }, credentials) {
    await axios
    .post(config.pass_forgot, credentials)
    .then(response => {
      dispatch('spawnNotification', {
        type: 'success',
        message: response.data.message,
        action1: { label: 'OK' }
      });
    })
    .catch(error => {
      dispatch('spawnNotification', {
        type: 'danger',
        message: error.response.data.message,
        action1: { label: 'OK' }
      });
    })
  },
  async resetPassword({ commit, dispatch }, credentials) {
    await axios
    .patch(config.pass_reset, credentials)
    .then(response => {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('refresh_token', response.data.refreshToken)
      localStorage.setItem('user_role', response.data.data.user.role)
      vm.$router.push('/')
      commit('setUserData', response.data.data.user)

      dispatch('spawnNotification', {
        type: 'success',
        message: 'Password changed successfully.',
        action1: { label: 'OK' }
      });
    })
    .catch(error => {
      dispatch('spawnNotification', {
        type: 'danger',
        message: error.response.data.message,
        action1: { label: 'OK' }
      });
    })
  },
  async updatePassword({ dispatch }, credentials) {
    await axios
    .patch(config.pass_update, credentials)
    .then(response => {
      dispatch('spawnNotification', {
        type: 'success',
        message: response.data.message,
        action1: { label: 'OK' }
      });
    })
    .catch(error => {
      dispatch('spawnNotification', {
        type: 'danger',
        message: error.response.data.message,
        action1: { label: 'OK' }
      });
    })
  },
}
const mutations = {
  setUserData: (state, userData) => state.userData = userData,
}

export default {
	state, getters, actions, mutations
}