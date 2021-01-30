import firebase from 'firebase/app'

export default {
    actions: {
        async login({ dispatch, commit }, { login, password }) {
            try {
                await firebase.auth().signInWithEmailAndPassword(login, password)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async registerHead({ dispatch, commit }, { login, password, fname, depart }) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(login + '@practice.vtik', password)
                    //console.log('reghead')
                const uid = await dispatch('getUid')
                    //console.log(uid)
                    //console.log(login + " " + password + " " + fname + " " + depart)
                await firebase.database().ref(`/pHead/${uid}/`).set({
                    login: login,
                    password: password,
                    fname: fname,
                    depart: depart,
                    ds: ''
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        },

        getUser() {
            const user = firebase.auth().currentUser
            return user
        },



        getUName() {
            const user = firebase.auth().currentUser
            return user.email ? user.email : null
        },

        async logout() {
            await firebase.auth().signOut()
        }
    }
}