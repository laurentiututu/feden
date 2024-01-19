import config from '../resources/endpoints/home.json'
import axios from 'axios'

const state = {
	popularLocations: [],
	mostSearchedLocations: [],
	lastAnnounces: []
}
const getters = {
	getPopularLocations: state => state.popularLocations,
	getMostSearchedLocations: state => state.mostSearchedLocations,
	getLastAnnounces: state => state.lastAnnounces
}
const actions = {
	async fetchHome({ commit }) {
		await axios
		.get(config.all)
		.then(response => {
			commit('setPopularLocations', response.data.data.popularLocations)
			commit('setMostSearchedLocations', response.data.data.mostSearchedLocations)
			commit('setLastAnnounces', response.data.data.lastAnnounces)
		})
		.catch(error => {
			console.log(error)
		})
	}
}
const mutations = {
	setPopularLocations: (state, locations) => state.popularLocations = locations,
	setMostSearchedLocations: (state, locations) => state.mostSearchedLocations = locations,
	setLastAnnounces: (state, announces) => state.lastAnnounces = announces
}

export default {
	state, getters, actions, mutations
}