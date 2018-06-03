import Vuex from "vuex";
import axios from 'axios';

const state = {
  authUser: null
}

const getters = {
  isAuth: state => state.authUser
}

const mutations = {
  setUser (state, user) {
    state.authUser = user
  },
}

const actions = {
  nuxtServerInit({ commit }, { req }) {
    // if auth token used by external API, fetch here e.g. req.session.authToken
    // then it can be accessed with store on all API calls
    console.log(req.session.authUser)
      if (req.session && req.session.authUser) {
        commit('setUser', req.session.authUser)
      }
    },
    login ({ commit }, data) {
      commit('setUser', data)
    },

    logout({ commit }) {
      axios.post('http://51.15.255.111:3000/user/logout')
      commit('setUser', null)
    }
}

export default () => new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
