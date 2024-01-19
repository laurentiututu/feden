import config from '../resources/endpoints/city.json'
import axios from 'axios'

const state = {
	cities: []
}
const getters = {
	getCities: state => state.cities
}
const actions = {
	async fetchCities({ commit }) {
		if ("cities" in localStorage) {
			commit('setCities', JSON.parse(localStorage.getItem('cities')))
		} else {
			await axios
			.get(config.all, { params: { page: 1, limit: 50, sort: 'name' } })
			.then(response => {
				localStorage.setItem('cities', JSON.stringify(response.data.data.cities))
				commit('setCities', response.data.data.cities)
			})
		}
	}
}
const mutations = {
	setCities: (state, cities) => state.cities = cities,
}

export default {
	state, getters, actions, mutations
}