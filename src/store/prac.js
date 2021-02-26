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

        async getPracListById({ commit, dispatch }, id) {
            try {
                const p = (await firebase.database().ref(`/pracList/${id}/`).once('value')).val() || {}
                return p
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getPList({ commit, dispatch }) {
            try {
                const p = (await firebase.database().ref(`/prac/`).once('value')).val() || {}
                return Object.keys(p).map(key => ({...p[key], id: key }))
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdatePracList({ commit, dispatch }, newT) {
            try {
                //console.log(newT)
                var old = await dispatch('getPracListById', newT.id)

                //console.log(old)
                const p = await dispatch('getPList')
                    //console.log(p)
                p.forEach(async pr => {
                    //console.log(pr)
                    if (pr.type == old.title) {
                        //console.log(pr.id)
                        var gr = await dispatch('getGroupById', pr.grid)
                        if (gr.edlvl == newT.edlvl) {
                            pr.type = newT.title
                            await dispatch('UpdatePrac', pr)
                        }
                    }
                });
                await firebase.database().ref(`/pracList/`).child(newT.id).update({ title: newT.title })
                console.log('updatePracList')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },



        async deletePrac({ commit, dispatch }, id) {
            try {
                //console.log(grID)
                await dispatch('deletePd', id)
                await dispatch('deleteRef', id)
                await dispatch('deleteRep', id)
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
                    await dispatch('deletePrac', prc.id)
                })
                console.log('deleted group prac')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },


        async addRef({ commit, dispatch }, dir) {
            try {
                await firebase.database().ref(`/referral/${dir.pid}/${dir.login}`).set({
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


        async getRefById({ commit, dispatch }, { pid, sid }) {
            try {
                const ref = (await firebase.database().ref(`/referral/${pid}/${sid}`).once('value')).val() || {}
                return ref
                    //return Object.keys(practice).map(key => ({...practice[key], id: key }))

            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdateRef({ commit, dispatch }, { pid, log, city, comment, contractDate, contractNum, dean, listGraph, listMat, order, orderdate, pracHead, pracResult, pracTaskRes, pracbase, prodObj, recomend, refNum, studChar, theme, univYear }) {
            try {
                await firebase.database().ref(`/referral/${pid}/`).child(log).update({ city, comment, contractDate, contractNum, dean, listGraph, listMat, order, orderdate, pracHead, pracResult, pracTaskRes, pracbase, prodObj, recomend, refNum, studChar, theme, univYear })
                console.log('updateRef')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getPracById({ commit, dispatch }, id) {
            try {
                const ref = (await firebase.database().ref(`/prac/${id}/`).once('value')).val() || {}
                return ref
                    //return Object.keys(practice).map(key => ({...practice[key], id: key }))

            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async addPd({ commit, dispatch }, { pid, sid, date }) {

            try {
                await firebase.database().ref(`/pd/${pid}/${sid}/${date}`).set({
                        text: ''
                    })
                    //return Object.keys(practice).map(key => ({...practice[key], id: key }))

            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async getPd({ commit, dispatch }, { pid, sid }) {

            try {
                //console.log(pid, sid)
                const pd = (await firebase.database().ref(`/pd/${pid}/${sid}/`).once('value')).val() || {}
                return Object.keys(pd).map(key => ({...pd[key], date: key }))
                    //return Object.keys(students).map(key => ({...students[key], id: key }))
                    //return Object.keys(practice).map(key => ({...practice[key], id: key }))

            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async UpdatePDay({ commit, dispatch }, { pid, sid, date, text }) {
            try {
                await firebase.database().ref(`/pd/${pid}/${sid}/`).child(date).update({ text })
                console.log('updatePDay')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async deletePd({ commit, dispatch }, pid) {
            try {
                console.log(pid)
                await firebase.database().ref(`/pd/`).child(pid).remove()
                console.log('deleted pd')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },


        async deleteRef({ commit, dispatch }, pid) {
            try {
                console.log(pid)
                await firebase.database().ref(`/referral/`).child(pid).remove()
                console.log('deleted ref')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },


        async deleteRep({ commit, dispatch }, pid) {
            try {
                console.log(pid)
                await firebase.database().ref(`/pracAni/`).child(pid).remove()
                await firebase.database().ref(`/pracAnip/`).child(pid).remove()
                await firebase.database().ref(`/pracApp/`).child(pid).remove()
                await firebase.database().ref(`/pracBpdp/`).child(pid).remove()
                await firebase.database().ref(`/pracBptp/`).child(pid).remove()
                await firebase.database().ref(`/pracByNIR/`).child(pid).remove()
                await firebase.database().ref(`/pracByop/`).child(pid).remove()
                await firebase.database().ref(`/pracMptp/`).child(pid).remove()
                await firebase.database().ref(`/pracMpNIR/`).child(pid).remove()
                await firebase.database().ref(`/pracMyop/`).child(pid).remove()
                console.log('deleted rep')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        // async deleteRefById({ commit, dispatch }, pid) {
        //     try {
        //         //console.log(pid)
        //         await firebase.database().ref(`/referral/`).child(pid).remove()
        //         console.log('deleted ref')
        //     } catch (e) {
        //         commit('setError', e)
        //         throw e
        //     }
        // },


        // async getRefList({ commit, dispatch }) {
        //     try {
        //         const rList = (await firebase.database().ref(`/referal/`).once('value')).val() || {}
        //         return Object.keys(rList).map(key => ({...rList[key], id: key }))
        //     } catch (e) {
        //         commit('setError', e)
        //         throw e
        //     }
        // },

        // async deleteRefPr({ commit, dispatch }, id) {
        //     try {
        //         var ref = []
        //         ref = await dispatch('getRefList')
        //         ref.forEach(async r => {
        //                 console.log(r.pid)
        //                 if (r.pid == id) {
        //                     await dispatch('deleteRefById', r.id)
        //                 }
        //             })
        //             // console.log('deleted group prac')
        //     } catch (e) {
        //         commit('setError', e)
        //         throw e
        //     }
        // },




    }
}