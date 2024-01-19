import config from '../resources/endpoints/user.json'
import axios from 'axios'

const state = {
	currentUser: {},
	userSlug: {}
}
const getters = {
	getCurrentUser: state => state.currentUser,
	getUserSlug: state => state.userSlug
}
const actions = {
	async fetchCurrentUser({ commit, dispatch}) {
		await axios
		.get(config.me)
		.then(response => {
			commit('setCurrentUser', response.data.data.user)
		})
		.catch(error => {
			console.log(error)
		})
	},
	async fetchUserSlug({ commit }, slug) {
		await axios
		.get(config.slug.replace('{{slug}}', slug))
		.then(response => {
			commit('setUserSlug', response.data.data.user)
		})
		.catch(error => {
			console.log(error)
		})
	},
	async updateCurrentUser ({ commit, dispatch }, data) {
    await axios
    .patch(config.me, data)
    .then(response => {
      commit('setCurrentUser', response.data.data.user)
      dispatch('spawnNotification', {
        type: 'success',
        message: 'Success',
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
   async updateUserImage({ commit, dispatch }, image) {
    await axios
    .put(config.avatar, image)
    .then(response => {
      commit('setCurrentUser', response.data.data.user)
      dispatch('spawnNotification', {
        type: 'success',
        message: 'Poza de profil a fost actualizată.',
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
  async deleteUserImage({ commit }) {
    const response = await axios
    .delete(config.avatar)
  },
}
const mutations = {
	setCurrentUser: (state, user) => state.currentUser = user,
	setUserSlug: (state, user) => state.userSlug = user
}

export default {
	state, getters, actions, mutations
}