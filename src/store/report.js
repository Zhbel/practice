import firebase from 'firebase/app'

export default {
    actions: {
        //Бакалавриат
        async getByopByID({ commit, dispatch }, id) {
            try {
                const rep = (await firebase.database().ref(`/pracByop/${id}/`).once('value')).val() || {}
                return rep
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateByop({ commit, dispatch }, { id, conclusion, dataCodeTask, programmingTask, taskResults }) {
            try {
                await firebase.database().ref(`/pracByop/`).child(id).update({ conclusion, dataCodeTask, programmingTask, taskResults })
                console.log('updateByop')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getByNIRByID({ commit, dispatch }, id) {
            try {
                const rep = (await firebase.database().ref(`/pracByNIR/${id}/`).once('value')).val() || {}
                return rep
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateByNIR({ commit, dispatch }, { id, conclusion, dataCodeTask, programmingTask, taskResults }) {
            try {
                await firebase.database().ref(`/pracByNIR/`).child(id).update({ conclusion, dataCodeTask, programmingTask, taskResults })
                console.log('updateByNIR')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getBptpByID({ commit, dispatch }, id) {
            try {
                const rep = (await firebase.database().ref(`/pracBptp/${id}/`).once('value')).val() || {}
                return rep
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateBptp({ commit, dispatch }, { id, baseChar, equipChar, intro, progChar, result }) {
            try {
                await firebase.database().ref(`/pracBptp/`).child(id).update({ baseChar, equipChar, intro, progChar, result })
                console.log('updateBptp')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getBpdpByID({ commit, dispatch }, id) {
            try {
                const rep = (await firebase.database().ref(`/pracBpdp/${id}/`).once('value')).val() || {}
                return rep
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateBpdp({ commit, dispatch }, { id, baseChar, intro, taskResults, usedRes }) {
            try {
                await firebase.database().ref(`/pracBpdp/`).child(id).update({ baseChar, intro, taskResults, usedRes })
                console.log('updateBpdp')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        //Бакалавриат

        //Magistr

        async getMyopByID({ commit, dispatch }, id) {
            try {
                const rep = (await firebase.database().ref(`/pracMyop/${id}/`).once('value')).val() || {}
                return rep
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateMyop({ commit, dispatch }, { id, conclusion, dataCodeTask, programmingTask, taskResults }) {
            try {
                await firebase.database().ref(`/pracMyop/`).child(id).update({ conclusion, dataCodeTask, programmingTask, taskResults })
                console.log('updateMyop')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getMpNIRByID({ commit, dispatch }, id) {
            try {
                const rep = (await firebase.database().ref(`/pracMpNIR/${id}/`).once('value')).val() || {}
                return rep
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateMpNIR({ commit, dispatch }, { id, conclusion, dataCodeTask, programmingTask, taskResults }) {
            try {
                await firebase.database().ref(`/pracMpNIR/`).child(id).update({ conclusion, dataCodeTask, programmingTask, taskResults })
                console.log('updateMpNIR')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getMptpByID({ commit, dispatch }, id) {
            try {
                const rep = (await firebase.database().ref(`/pracMptp/${id}/`).once('value')).val() || {}
                return rep
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateMptp({ commit, dispatch }, { id, baseChar, equipChar, intro, progChar, result }) {
            try {
                await firebase.database().ref(`/pracMptp/`).child(id).update({ baseChar, equipChar, intro, progChar, result })
                console.log('updateBptp')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        //Magistr

        //ASS

        async getAnipByID({ commit, dispatch }, id) {
            try {
                const rep = (await firebase.database().ref(`/pracAnip/${id}/`).once('value')).val() || {}
                return rep
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateAnip({ commit, dispatch }, { id, conclusion, personalTask, placeDesc, pracBase, pracHead, researchArea, usedLit, usedPubl, usedRes }) {
            try {
                await firebase.database().ref(`/pracAnip/`).child(id).update({ conclusion, personalTask, placeDesc, pracBase, pracHead, researchArea, usedLit, usedPubl, usedRes })
                console.log('updateAnip')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getAniByID({ commit, dispatch }, id) {
            try {
                const rep = (await firebase.database().ref(`/pracAni/${id}/`).once('value')).val() || {}
                return rep
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateAni({ commit, dispatch }, { id, conf, halfyear, other, publicW, review, workbefore }) {
            try {
                await firebase.database().ref(`/pracAni/`).child(id).update({ conf, halfyear, other, publicW, review, workbefore })
                console.log('updateAni')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getAppByID({ commit, dispatch }, id) {
            try {
                const rep = (await firebase.database().ref(`/pracApp/${id}/`).once('value')).val() || {}
                return rep
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateApp({ commit, dispatch }, { id, PTparts, conclusion, edProg, personalTask, placeDesc, usedEd }) {
            try {
                await firebase.database().ref(`/pracApp/`).child(id).update({ PTparts, conclusion, edProg, personalTask, placeDesc, usedEd })
                console.log('updateApp')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

    }
}