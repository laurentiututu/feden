import config from '../resources/endpoints/announce.json'
import axios from 'axios'
import { vm } from '@/main'

const state = {
	publicAnnounces: {},
	userAnnounces: {},
	adminAnnounces: {},
	publicAnnounce: {},
	userAnnounce: {},
}
const getters = {
	getPublicAnnounces: state => state.publicAnnounces,
	getUserAnnounces: state => state.userAnnounces,
	getAdminAnnounces: state => state.adminAnnounces,
	getPublicAnnounce: state => state.publicAnnounce,
	getUserAnnounce: state => state.userAnnounce,
}
const actions = {
	async fetchPublicAnnounces({ commit, dispatch }, data) {
		let query = {...data}
		query.limit ? '' : query.limit = 18
		query.page ? '' : query.page = 1

		await axios
		.get(config.all, { params: query })
		.then(response => {
			commit('setPublicAnnounces', response.data.data)
		})
		.catch(error => {
			console.log(error)
		})
	},
	async fetchUserAnnounces({ commit, dispatch }, data) {
		let query = {
			page: data?.page || 1,
			limit: data?.limit || 18
		}
		await axios
		.get(config.me, { params: query })
		.then(response => {
			commit('setUserAnnounces', response.data.data)
		})
		.catch(error => {
			console.log(error)
		})
	},
	async fetchAdminAnnounces({ commit, dispatch }, data) {
		let query = {
			page: data?.page || 1,
			limit: data?.limit || 18
		}
		await axios
		.get(config.admin, { params: query })
		.then(response => {
			commit('setAdminAnnounces', response.data.data)
		})
		.catch(error => {
			console.log(error)
		})
	},
	async fetchPublicAnnounce({ commit, dispatch }, slug) {
		await axios
		.get(config.slug.replace('{{slug}}', slug))
		.then(response => {
			commit('setPublicAnnounce', response.data.data.announce)
		})
		.catch(error => {
			console.log(error)
		})
	},
	async fetchUserAnnounce({ commit, dispatch }, id) {
		await axios
		.get(config.id.replace('{{id}}', id))
		.then(response => {
			commit('setUserAnnounce', response.data.data.announce)
		})
		.catch(error => {
			console.log(error)
		})
	},
	async createAnnounce({ commit, dispatch }, { data, images }) {
		await axios
		.post(config.all, data)
		.then(response => {
			images.forEach(album => {
				const gallery = { id: response.data.data.announce.id, images: album }
				dispatch('uploadGallery', gallery)
			})
		})
		.catch(error => {
			console.log(error)
		})
	},
	async deleteAnnounce({ commit, dispatch }, id) {
		await axios
		.delete(config.id.replace('{{id}}', id))
		.then(() => {
			dispatch('fetchUserAnnounces')
			dispatch('spawnNotification', {
        type: 'success',
        message: 'Anunțul a fost șters.',
        action1: { label: 'OK' }
      });
		})
	},
	async editAnnounce({ commit, dispatch }, data) {
		await axios
		.patch(config.id.replace('{{id}}', data.id), data.data)
		.then(response => {
			JSON.parse(localStorage.getItem('user')).role == 'admin'
			? dispatch('fetchAdminAnnounces', { limit: 6, page: vm.$route.query.page || 1 })
			: dispatch('fetchUserAnnounces')

			dispatch('spawnNotification', {
        type: 'success',
        message: 'Anunțul a fost actualizat.',
        action1: { label: 'OK' }
      });
		})
		.catch(error => {
			console.log(error)
		})
	},
	async uploadGallery({ commit,dispatch }, data) {
		await axios
		.put(config.image.replace('{{id}}', data.id), data.images.pictures)
		.then(response => {
			console.log(response)
		})
		.catch(error => {
			console.log(error)
		})
	}
}
const mutations = {
	setPublicAnnounces: (state, announces) => state.publicAnnounces = announces,
	setUserAnnounces: (state, announces) => state.userAnnounces = announces,
	setAdminAnnounces: (state, announces) => state.adminAnnounces = announces,
	setPublicAnnounce: (state, announce) => state.publicAnnounce = announce,
	setUserAnnounce: (state, announce) => state.userAnnounce = announce,
}

export default {
	state, getters, actions, mutations
}