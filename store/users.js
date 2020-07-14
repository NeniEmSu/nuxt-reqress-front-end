import axios from 'axios'
const URL = `${process.env.BACKEND_ENDPOINT}`
const config = {
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
}

export const state = () => ({
  users: [],
  user: {},
  company: {
    company: 'StatusCode Weekly',
    text:
      'A weekly newsletter focusing on software development, infrastructure, the server, performance, and the stack end of things.',
    url: 'http://statuscode.org/',
  },
  rows: 0,
  errors: [],
  loading: false,
})

export const actions = {
  async getUsers({ commit }, currentPage) {
    try {
      commit('SET_LOADING')
      commit('CLEAR_ERRORS')
      const response = await axios.get(
        `${URL}?page=${currentPage}&per_page=3&delay=3`,
        config
      )
      const data = response.data
      commit('SET_USERS', data)
    } catch (error) {
      commit('SET_ERRORS', error)
      this.$swal('Error', error.message, 'error')
    }
  },

  async getSingleUser({ commit }, userId) {
    try {
      commit('SET_LOADING')
      const response = await axios.get(`${URL}/${userId}?delay=3`, config)
      const data = response.data
      const userData = data.data
      commit('SET_USER', userData)
      commit('SET_COMPANY', data)
    } catch (error) {
      commit('SET_ERRORS', error)
      this.$swal('Error', error.message, 'error')
    }
  },

  async addUser({ commit }, userDetails) {
    try {
      const response = await axios.post(
        `${URL}`,
        {
          first_name: userDetails.first_name,
          last_name: userDetails.last_name,
          email: userDetails.email,
          avatar: userDetails.avatar,
        },
        config
      )
      this.$swal(
        'Success',
        `New User: ${response.data.first_name}, with email address: ${response.data.email} was added successfully`,
        'success'
      )
      const data = await response.data
      commit('ADD_NEW_USER', data)
    } catch (error) {
      commit('SET_ERRORS', error)
      this.$swal('Error', error.message, 'error')
    }
  },

  deleteSingleUser({ commit }, id) {
    this.$swal({
      name: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((willDelete) => {
      if (willDelete.value) {
        axios
          .delete(`${URL}/${id}`, config)
          .then((response) => {
            this.$router.push('/users')
            this.$swal({
              text: "Poof! You've sucessfully deleted that user!",
              icon: 'success',
            })
          })
          .then(() => {
            commit('REMOVE_DELETED_USER', id)
          })
          .catch((error) => {
            this.$swal({
              name: 'Somethimg went wrong!',
              text: error.message,
              icon: 'error',
            })
          })
      } else {
        this.$swal("That user's data is safe!")
      }
    })
  },

  async updateUser({ commit }, updatedUser) {
    try {
      const response = await axios.put(
        `${URL}/${updatedUser.id}`,
        updatedUser,
        config
      )
      this.$swal(
        'Success',
        `User: ${response.data.first_name}, with email address: ${response.data.email} was edited successfully`,
        'success'
      )
      const data = response.data
      commit('UPDATE_USER', data)
    } catch (error) {
      commit('SET_ERRORS', error)
      this.$swal('Error', error.message, 'error')
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
    state.users = data.data
    state.rows = data.total
    state.loading = false
  },

  SET_USER(state, data) {
    state.user = data
    state.loading = false
  },

  SET_COMPANY(state, data) {
    state.company = data.ad
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

export const getters = {
  getuserById: (state) => (id) => {
    return state.users.find((user) => user.id === id)
  },
}
