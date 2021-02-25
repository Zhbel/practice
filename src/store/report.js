import firebase from 'firebase/app'

export default {
    actions: {
        //Бакалавриат
        async getByopByID({ commit, dispatch }, { pid, sid }) {
            try {
                const rep = (await firebase.database().ref(`/pracByop/${pid}/${sid}/`).once('value')).val() || {}
                return rep
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateByop({ commit, dispatch }, { pid, log, conclusion, dataCodeTask, programmingTask, taskResults }) {
            try {
                await firebase.database().ref(`/pracByop/${pid}/`).child(log).update({ conclusion, dataCodeTask, programmingTask, taskResults })
                console.log('updateByop')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getByNIRByID({ commit, dispatch }, { pid, sid }) {
            try {
                const rep = (await firebase.database().ref(`/pracByNIR/${pid}/${sid}/`).once('value')).val() || {}
                return rep
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateByNIR({ commit, dispatch }, { pid, log, conclusion, dataCodeTask, programmingTask, taskResults }) {
            try {
                await firebase.database().ref(`/pracByNIR/${pid}/`).child(log).update({ conclusion, dataCodeTask, programmingTask, taskResults })
                console.log('updateByNIR')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getBptpByID({ commit, dispatch }, { pid, sid }) {
            try {
                const rep = (await firebase.database().ref(`/pracBptp/${pid}/${sid}/`).once('value')).val() || {}
                return rep
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateBptp({ commit, dispatch }, { pid, log, baseChar, equipChar, intro, progChar, result }) {
            try {
                await firebase.database().ref(`/pracBptp/${pid}/`).child(log).update({ baseChar, equipChar, intro, progChar, result })
                console.log('updateBptp')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getBpdpByID({ commit, dispatch }, { pid, sid }) {
            try {
                const rep = (await firebase.database().ref(`/pracBpdp/${pid}/${sid}/`).once('value')).val() || {}
                return rep
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateBpdp({ commit, dispatch }, { pid, log, baseChar, intro, taskResults, usedRes }) {
            try {
                await firebase.database().ref(`/pracBpdp/${pid}/`).child(log).update({ baseChar, intro, taskResults, usedRes })
                console.log('updateBpdp')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        //Бакалавриат

        //Magistr

        async getMyopByID({ commit, dispatch }, { pid, sid }) {
            try {
                const rep = (await firebase.database().ref(`/pracMyop/${pid}/${sid}/`).once('value')).val() || {}
                return rep
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateMyop({ commit, dispatch }, { pid, log, conclusion, dataCodeTask, programmingTask, taskResults }) {
            try {
                await firebase.database().ref(`/pracMyop/${pid}/`).child(log).update({ conclusion, dataCodeTask, programmingTask, taskResults })
                console.log('updateMyop')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getMpNIRByID({ commit, dispatch }, { pid, sid }) {
            try {
                const rep = (await firebase.database().ref(`/pracMpNIR/${pid}/${sid}/`).once('value')).val() || {}
                return rep
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateMpNIR({ commit, dispatch }, { pid, log, conclusion, dataCodeTask, programmingTask, taskResults }) {
            try {
                await firebase.database().ref(`/pracMpNIR/${pid}/`).child(log).update({ conclusion, dataCodeTask, programmingTask, taskResults })
                console.log('updateMpNIR')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getMptpByID({ commit, dispatch }, { pid, sid }) {
            try {
                const rep = (await firebase.database().ref(`/pracMptp/${pid}/${sid}/`).once('value')).val() || {}
                return rep
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateMptp({ commit, dispatch }, { pid, log, baseChar, equipChar, intro, progChar, result }) {
            try {
                await firebase.database().ref(`/pracMptp/${pid}/`).child(log).update({ baseChar, equipChar, intro, progChar, result })
                console.log('updateBptp')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        //Magistr

        //ASS

        async getAnipByID({ commit, dispatch }, { pid, sid }) {
            try {
                const rep = (await firebase.database().ref(`/pracAnip/${pid}/${sid}/`).once('value')).val() || {}
                return rep
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateAnip({ commit, dispatch }, { pid, log, conclusion, personalTask, placeDesc, pracBase, pracHead, researchArea, usedLit, usedPubl, usedRes }) {
            try {
                await firebase.database().ref(`/pracAnip/${pid}/`).child(log).update({ conclusion, personalTask, placeDesc, pracBase, pracHead, researchArea, usedLit, usedPubl, usedRes })
                console.log('updateAnip')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getAniByID({ commit, dispatch }, { pid, sid }) {
            try {
                const rep = (await firebase.database().ref(`/pracAni/${pid}/${sid}/`).once('value')).val() || {}
                return rep
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateAni({ commit, dispatch }, { pid, log, conf, halfyear, other, publicW, review, workbefore }) {
            try {
                await firebase.database().ref(`/pracAni/${pid}/`).child(log).update({ conf, halfyear, other, publicW, review, workbefore })
                console.log('updateAni')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getAppByID({ commit, dispatch }, { pid, sid }) {
            try {
                const rep = (await firebase.database().ref(`/pracApp/${pid}/${sid}/`).once('value')).val() || {}
                return rep
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateApp({ commit, dispatch }, { pid, log, PTparts, conclusion, edProg, personalTask, placeDesc, usedEd }) {
            try {
                await firebase.database().ref(`/pracApp/${pid}/`).child(log).update({ PTparts, conclusion, edProg, personalTask, placeDesc, usedEd })
                console.log('updateApp')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

    }
}