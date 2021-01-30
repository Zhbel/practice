import firebase from 'firebase/app'

export default {
    actions: {
        async addGroup({ commit, dispatch }, { id, title, spec, profile, edlvl }) {
            try {
                await firebase.database().ref(`/group/${id}/`).set({
                    title,
                    spec,
                    profile,
                    edlvl
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getGroups({ commit, dispatch }) {
            try {
                const groups = (await firebase.database().ref(`/group/`).once('value')).val() || {}
                return Object.keys(groups).map(key => ({...groups[key], id: key }))
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getGroupById({ commit, dispatch }, grid) {
            try {
                const group = (await firebase.database().ref(`/group/${grid}/`).once('value')).val() || {}
                return group
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async deleteGroup({ commit, dispatch }, grID) {
            try {
                //console.log(grID)
                await firebase.database().ref(`/group/`).child(grID).remove()
                console.log('deleted group')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async editGroup({ commit, dispatch }, { id, title, spec, profile, edlvl }) {
            try {
                await firebase.database().ref(`/group/`).child(id).update({ edlvl, profile, spec, title })
                console.log('updateGroup after update')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }

    }
}