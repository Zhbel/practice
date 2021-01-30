import firebase from 'firebase/app'

export default {
    actions: {
        async addPrac({ commit, dispatch }, prac) {
            try {
                await firebase.database().ref(`/prac/${prac.id}/`).set({
                    pid: prac.pid,
                    grid: prac.grid,
                    title: prac.title,
                    type: prac.type,
                    datestart: prac.datestart,
                    dateend: prac.dateend
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async addPracList({ commit, dispatch }, edlvl) {
            try {
                console.log(edlvl)
                await firebase.database().ref(`/pracList/${edlvl.id}/`).set({
                    title: edlvl.title,
                    edlvl: edlvl.edlvl,
                    tablename: edlvl.tablename
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getPracList({ commit, dispatch }) {
            try {
                const pList = (await firebase.database().ref(`/pracList/`).once('value')).val() || {}
                return Object.keys(pList).map(key => ({...pList[key], id: key }))
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdatePracList({ commit, dispatch }, { id, title }) {
            try {
                await firebase.database().ref(`/pracList/`).child(id).update({ title })
                console.log('updatePracList')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async deletePrac({ commit, dispatch }, id) {
            try {
                //console.log(grID)
                await firebase.database().ref(`/prac/`).child(id).remove()
                console.log('deleted prac')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdatePrac({ commit, dispatch }, { id, pid, title, type, datestart, dateend }) {
            try {
                await firebase.database().ref(`/prac/`).child(id).update({ pid, title, type, datestart, dateend })
                console.log('updatePrac')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getPracGr({ commit, dispatch }, grid) {
            try {
                const practice = (await firebase.database().ref(`/prac/`).orderByChild('grid').equalTo(grid).once('value')).val() || {}
                return Object.keys(practice).map(key => ({...practice[key], id: key }))
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },


        async deletePracGr({ commit, dispatch }, id) {
            try {
                var prac = []
                prac = await dispatch('getPracGr', id)
                    //console.log(prac)
                prac.forEach(async prc => {
                    await firebase.database().ref(`/prac/`).child(prc.id).remove()
                })
                console.log('deleted group prac')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async checkDir({ commit, dispatch }, id) {
            try {
                const dir = (await firebase.database().ref(`/referal/${id}`).once('value')).val() || {}
                return dir

            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async addDir({ commit, dispatch }, dir) {
            try {
                await firebase.database().ref(`/referal/${dir.id}/`).set({
                    sid: dir.sid,
                    pid: dir.pid,
                    practype: dir.practype,
                    pracbase: '',
                    city: '',
                    order: '',
                    orderdate: '',
                    contractNum: '',
                    contractDate: '',
                    refNum: '',
                    univYear: '',
                    pracHead: '',
                    dean: '',
                    prodObj: '',
                    theme: '',
                    listMat: '',
                    listGraph: '',
                    pracResult: '',
                    pracTaskRes: '',
                    studChar: '',
                    comment: '',
                    recomend: ''
                })
                console.log('addRef')
                    //return Object.keys(practice).map(key => ({...practice[key], id: key }))

            } catch (e) {
                commit('setError', e)
                throw e
            }
        },


    }
}