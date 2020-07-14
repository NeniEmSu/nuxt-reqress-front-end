import axios from 'axios'
const URL = `${process.env.BACKEND_ENDPOINT}`
const config = {
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
}

export const state = () => ({
  users: [],
  errors: [],
  loading: false,
})

export const actions = {
  async getAllUsers({ commit, dispatch, rootState }, context, state) {
    try {
      commit('SET_LOADING')
      commit('CLEAR_ERRORS')
      const response = await axios.get(`${URL}`, config)
      const data = response.data
      commit('SET_USERS', data)
    } catch (error) {
      commit('SET_ERRORS', error)
    }
  },

  async getSpecificUserUsers({ commit }, userId) {
    try {
      const response = await axios.get(`${URL}/{userId}`, config)
      const data = await response.data
      commit('SET_USERS', data)
    } catch (error) {
      commit('SET_ERRORS', error)
    }
  },

  async addUser({ commit }, userDetails) {
    try {
      const response = await axios.post(
        `${URL}/users`,
        {
          userDetails,
        },
        config
      )
      const data = await response.data
      commit('ADD_NEW_USER', data)
    } catch (error) {
      commit('SET_ERRORS', error)
    }
  },

  async deleteSingleUser({ commit }, id) {
    try {
      await axios.delete(`${URL}/${id}`, config)

      commit('REMOVE_DELETED_USER', id)
    } catch (error) {
      commit('SET_ERRORS', error)
    }
  },

  async updateUser({ commit }, updatedUser) {
    try {
      const response = await axios.put(
        `${URL}/users/${updatedUser.id}`,
        updatedUser,
        config
      )
      const data = response.data
      commit('UPDATE_USER', data)
    } catch (error) {
      commit('SET_ERRORS', error)
    }
  },
}

export const mutations = {
  CLEAR_ERRORS(state, error) {
    state.errors = []
  },

  SET_ERRORS(state, error) {
    state.errors.push(error)
    state.loading = false
  },

  SET_LOADING(state) {
    state.loading = true
  },

  SET_USERS(state, data) {
    state.users = data
    state.loading = false
  },

  ADD_NEW_USER(state, data) {
    state.users.unshift(data)
  },

  UPDATE_USER(state, updatedUser) {
    const index = state.users.findIndex((user) => user.id === updatedUser.id)
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser)
    }
  },

  REMOVE_DELETED_USER(state, id) {
    state.users = state.users.filter((user) => user.id !== id)
  },
}

export const getters = {}
