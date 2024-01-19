import config from '../resources/endpoints/application.json'
import axios from 'axios'

const state = {
	applications: [],
	announceApplications: []
}
const getters = {
	getApplications: state => state.applications,
	getAnnounceApplications: state => state.announceApplications
}
const actions = {
	async fetchApplications({ commit, dispatch }) {
		await axios
		.get(config.all)
		.then(response => {
			commit('setApplications', response.data.data.applications)
		})
		.catch(error => {
			console.log(error)
		})
	},
	async fetchAnnounceApplications({ commit, dispatch }, id) {
		await axios
		.get(config.announce.replace('{{announceID}}', id))
		.then(response => {
			commit('setAnnounceApplications', response.data.data.offers)
		})
		.catch(error => {
			console.log(error)
		})
	},
	async createApplication({ commit, dispatch }, data) {
		await axios
		.post(config.all, data)
		.then(response => {
			console.log(response)
			dispatch('fetchPublicAnnounce', data.announce)
			dispatch('spawnNotification', {
        type: 'success',
        message: 'Ai plasat o ofertă pentru acest anunț. Urmărește evoluția acesteia din contul tău.',
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
	async cancelApplication({ commit, dispatch }, id) {
		await axios
		.delete(config.id.replace('{{id}}', id))
		.then(() => {
			dispatch('fetchApplications')
			dispatch('spawnNotification', {
        type: 'success',
        message: 'Oferta a fost anulată.',
        action1: { label: 'OK' }
      });
		})
	},
	async handleApplication({ commit, dispatch }, data) {
		await axios
		.patch(config.id.replace('{{id}}', data.id), data.data)
		.then(response => {
			dispatch('fetchAnnounceApplications', data.announce)
			dispatch('spawnNotification', {
        type: 'success',
        message: 'Oferta a fost actualizată.',
        action1: { label: 'OK' }
      });
		})
		.catch(error => {
			console.log(error)
		})
	}
}
const mutations = {
	setApplications: (state, applications) => state.applications = applications,
	setAnnounceApplications: (state, applications) => state.announceApplications = applications
}

export default {
	state, getters, actions, mutations
}