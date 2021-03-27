import firebase from 'firebase/app'

export default {
    actions: {
        async addAnip({ commit, dispatch }, tmpAnip) {
            try {
                await firebase.database().ref(`/pracAnip/${tmpAnip.pid}/${tmpAnip.log}/`).set({
                    sid: tmpAnip.sid,
                    pid: tmpAnip.pid,
                    pracBase: '',
                    pracHead: '',
                    taskRes: '',
                    placeDesc: '',
                    researchArea: '',
                    personalTask: '',
                    usedRes: '',
                    conclusion: '',
                    usedLit: '',
                    usedPubl: '',
                })
                console.log('addAnip')
                    //return Object.keys(practice).map(key => ({...practice[key], id: key }))

            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async addAni({ commit, dispatch }, tmpAni) {
            try {
                await firebase.database().ref(`/pracAni/${tmpAni.pid}/${tmpAni.log}/`).set({
                    sid: tmpAni.sid,
                    pid: tmpAni.pid,
                    workbefore: '',
                    halfyear: '',
                    publicW: '',
                    conf: '',
                    other: '',
                    review: '',
                })
                console.log('addAni')
                    //return Object.keys(practice).map(key => ({...practice[key], id: key }))

            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async addApp({ commit, dispatch }, tmpApp) {
            try {
                await firebase.database().ref(`/pracApp/${tmpApp.pid}/${tmpApp.log}/`).set({
                        sid: tmpApp.sid,
                        pid: tmpApp.pid,
                        placeDesc: '',
                        edProg: '',
                        personalTask: '',
                        PTparts: '',
                        usedEd: '',
                        conclusion: '',
                    })
                    //console.log('addApp'

            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async addByop({ commit, dispatch }, tmpByop) {
            try {
                await firebase.database().ref(`/pracByop/${tmpByop.pid}/${tmpByop.log}/`).set({
                        sid: tmpByop.sid,
                        pid: tmpByop.pid,
                        taskResults: '',
                        dataCodeTask: '',
                        programmingTask: '',
                        conclusion: '',
                    })
                    // console.log('addByop')


            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async addByNIR({ commit, dispatch }, tmpByNIR) {
            try {
                await firebase.database().ref(`/pracByNIR/${tmpByNIR.pid}/${tmpByNIR.log}/`).set({
                        sid: tmpByNIR.sid,
                        pid: tmpByNIR.pid,
                        placeDesc: '',
                        prTask: '',
                        pracPlan: '',
                        pracRes: '',
                        conclusion: '',
                    })
                    //  console.log('addByNIR')


            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async addBptp({ commit, dispatch }, tmpBptp) {
            try {
                await firebase.database().ref(`/pracBptp/${tmpBptp.pid}/${tmpBptp.log}/`).set({
                        sid: tmpBptp.sid,
                        pid: tmpBptp.pid,
                        intro: '',
                        baseChar: '',
                        equipChar: '',
                        progChar: '',
                        result: '',
                        usedRes: '',
                    })
                    // console.log('addBptp')


            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async addBpdp({ commit, dispatch }, tmpBpdp) {
            try {
                await firebase.database().ref(`/pracBpdp/${tmpBpdp.pid}/${tmpBpdp.log}/`).set({
                        sid: tmpBpdp.sid,
                        pid: tmpBpdp.pid,
                        intro: '',
                        baseChar: '',
                        taskResults: '',
                        usedRes: '',
                    })
                    //console.log('addBpdp')

            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async addMyop({ commit, dispatch }, tmpMyop) {
            try {
                await firebase.database().ref(`/pracMyop/${tmpMyop.pid}/${tmpMyop.log}/`).set({
                        sid: tmpMyop.sid,
                        pid: tmpMyop.pid,
                        intro: '',
                        baseChar: '',
                        equipChar: '',
                        progChar: '',
                        result: '',
                        usedRes: '',
                    })
                    // console.log('addMyop')


            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async addMpNIR({ commit, dispatch }, tmpMpNIR) {
            try {
                await firebase.database().ref(`/pracMpNIR/${tmpMpNIR.pid}/${tmpMpNIR.log}/`).set({
                        sid: tmpMpNIR.sid,
                        pid: tmpMpNIR.pid,
                        workbefore: '',
                        halfyear: '',
                        publicW: '',
                        conf: '',
                        other: '',
                        review: '',
                    })
                    // console.log('addMpNIR')


            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async addMptp({ commit, dispatch }, tmpBptp) {
            try {
                await firebase.database().ref(`/pracMptp/${tmpBptp.pid}/${tmpBptp.log}/`).set({
                        sid: tmpBptp.sid,
                        pid: tmpBptp.pid,
                        intro: '',
                        baseChar: '',
                        equipChar: '',
                        progChar: '',
                        result: '',
                        usedRes: '',
                    })
                    // console.log('addMptp')


            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
    }
}