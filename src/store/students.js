import firebase from 'firebase/app'

export default {
    actions: {
        async getStudGr({ commit, dispatch }, grid) {
            try {
                const students = (await firebase.database().ref(`/stud/`).orderByChild('grid').equalTo(grid).once('value')).val() || {}
                return Object.keys(students).map(key => ({...students[key], id: key }))
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getStudByLogin({ commit, dispatch }, login) {
            try {
                const student = (await firebase.database().ref(`/stud/`).orderByChild('login').equalTo(login).once('value')).val() || {}
                return Object.keys(student).map(key => ({...student[key], id: key }))
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getStudById({ commit, dispatch }, uid) {
            try {
                const student = (await firebase.database().ref(`/stud/${uid}/`).once('value')).val() || {}
                return student
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getStudId({ commit, dispatch }) {
            try {
                const uid = await dispatch('getUid')
                const student = (await firebase.database().ref(`/stud/${uid}/`).once('value')).val() || {}
                return student
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateStud({ commit, dispatch }, { id, fname, state, grid }) {
            try {
                await firebase.database().ref(`/stud/`).child(id).update({ grid, state, fname })
                console.log('updateStud')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async deleteStudent({ commit, dispatch }, student) {
            try {
                var config = {
                    apiKey: "AIzaSyBAQnNX_8mTXNNZYm-YPMtZBzb-G_ilg_Q",
                    authDomain: "practice-610f2.firebaseapp.com",
                    databaseURL: "https://practice-610f2.firebaseio.com"
                        /*apiKey: "AIzaSyA-2cMxBJKPxeliTpcqFxIq1MblmAmVnqE",
                        authDomain: "practice-vtik.firebaseapp.com",
                        databaseURL: "https://practice-vtik-default-rtdb.firebaseio.com",*/
                };
                var tmp = 'del_' + Math.floor(Math.random() * 10000) + Math.floor(Math.random() * 10000);
                var secondaryApp = firebase.initializeApp(config, tmp);

                await firebase.database().ref(`/stud/`).child(student.id).remove()
                console.log('removed from stud')

                try {
                    await secondaryApp.auth().signInWithEmailAndPassword(student.login + '@practice.vtik', student.password)
                    var user = secondaryApp.auth().currentUser
                    user.delete();
                    console.log(user.uid + ' removed from auth?')

                } catch (e) {
                    commit('setError', e)
                    throw e
                }
                secondaryApp.delete();
                //console.log('deleted group')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
    }
}