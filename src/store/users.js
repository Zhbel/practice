import firebase from 'firebase/app'

export default {
    actions: {
        async getHeadInfo({ commit, dispatch }) {
            try {
                const uid = await dispatch('getUid')
                    //console.log(uid)
                const user = (await firebase.database().ref(`/pHead/${uid}/`).once('value')).val() || {}
                    //console.log('users.js')
                    //console.log(user)
                return user
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getHeadById({ commit, dispatch }, uid) {
            try {
                //console.log(uid)
                const head = (await firebase.database().ref(`/pHead/${uid}/`).once('value')).val() || {}
                    //console.log('users.js')
                    //console.log(user)
                return head
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getHeads({ commit, dispatch }) {
            try {
                const heads = (await firebase.database().ref(`/pHead/`).once('value')).val() || {}
                return Object.keys(heads).map(key => ({...heads[key], id: key }))
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async updateHead({ commit, dispatch }, { fname, depart, abbr }) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/pHead/`).child(uid).update({ fname, depart, abbr })
                    //console.log('updateHead after update')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async updateHeadPass({ commit, dispatch }, { fname, depart, abbr, login, password, ds }) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/pHead/`).child(uid).update({ fname, depart, abbr, login, password, ds })
                    //console.log('updateHead after update')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async registerStud({ dispatch, commit }, student) {
            var config = {
                apiKey: "AIzaSyBAQnNX_8mTXNNZYm-YPMtZBzb-G_ilg_Q",
                authDomain: "practice-610f2.firebaseapp.com",
                databaseURL: "https://practice-610f2.firebaseio.com",
                /*apiKey: "AIzaSyA-2cMxBJKPxeliTpcqFxIq1MblmAmVnqE",
                authDomain: "practice-vtik.firebaseapp.com",
                databaseURL: "https://practice-vtik-default-rtdb.firebaseio.com",*/
            };
            var tmp = 'reg_' + Math.floor(Math.random() * 10000) + Math.floor(Math.random() * 10000);
            var secondaryApp = firebase.initializeApp(config, tmp);

            console.log('insert array from dispatch')
                // console.log(insertArray)
            try {

                await secondaryApp.auth().createUserWithEmailAndPassword(student.login + '@practice.vtik', student.password)
                const uid = secondaryApp.auth().currentUser.uid
                console.log('new uid ' + uid)
                await firebase.database().ref(`/stud/${uid}/`).set({
                    login: student.login,
                    password: student.password,
                    fname: student.fname,
                    grid: student.grid,
                    state: student.state,
                    ds: ''
                })
                await secondaryApp.auth().signOut();
                secondaryApp.delete();


            } catch (e) {
                commit('setError', e)
                throw e
            }

        },


    }
}