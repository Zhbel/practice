import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import users from './users'
import group from './group'
import prac from './prac'
import students from './students'
import ptable from './ptable'
import report from './report'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        error: null
    },
    mutations: {
        setError(state, error) {
            state.error = error
        },
        clearError(state) {
            state.error = null
        }
    },
    getters: {
        error: s => s.error
    },
    actions: {},
    modules: {
        auth,
        group,
        users,
        students,
        ptable,
        prac,
        report,
    }
})