import Vue from 'vue'
import VueRouter from 'vue-router'
import Uimini from 'uimini/dist/css/uimini.css'
import VueToast from 'vue-toast-notification'
import Vuetify from 'vuetify'
import firebase from 'firebase/app'

import 'vue-toast-notification/dist/theme-default.css';
import loader from '@/utils/loader'


Vue.use(VueRouter)
Vue.use(Uimini)
Vue.use(VueToast);
Vue.use(Vuetify)

const routes = [{
        path: '/',
        name: 'login',
        meta: { layout: 'login' },
        component: () =>
            import ('../views/Login.vue')
    },

    {
        path: '/login',
        name: 'login',
        meta: { layout: 'login' },
        component: () =>
            import ('../views/Login.vue')
    },

    {
        path: '/stud',
        name: 'stud',
        meta: { layout: 'main', auth: true },
        component: () =>
            import ('../views/Stud.vue')
    },

    {
        path: '/pstud',
        name: 'pstud',
        meta: { layout: 'main', auth: true, head: true },
        component: () =>
            import ('../views/PractStud.vue'),
    },

    {
        path: '/reg',
        name: 'register',
        meta: { layout: 'login' },
        component: () =>
            import ('../views/Register.vue')
    },

    {
        path: '/head',
        name: 'head',
        meta: { layout: 'main', auth: true, head: true },
        component: () =>
            import ('../views/Head.vue')
    },

    {
        path: '/group',
        name: 'group',
        meta: { layout: 'main', auth: true, head: true },
        component: () =>
            import ('../views/Group.vue')
    },

    {
        path: '/students',
        name: 'students',
        meta: { layout: 'main', auth: true, head: true },
        component: () =>
            import ('../views/Students.vue')
    },

    {
        path: '/practice',
        name: 'practice',
        meta: { layout: 'main', auth: true, head: true },
        component: () =>
            import ('../views/Practice.vue')
    },

    {
        path: '/rep/byop',
        name: 'rep/byop',
        meta: { layout: 'main', auth: true },
        component: () =>
            import ('../views/rep/byop.vue')
    },

    {
        path: '/rep/byNIR',
        name: 'rep/byNIR',
        meta: { layout: 'main', auth: true },
        component: () =>
            import ('../views/rep/byNIR.vue')
    },

    {
        path: '/rep/bptp',
        name: 'rep/bptp',
        meta: { layout: 'main', auth: true },
        component: () =>
            import ('../views/rep/bptp.vue')
    },

    {
        path: '/rep/bpdp',
        name: 'rep/bpdp',
        meta: { layout: 'main', auth: true },
        component: () =>
            import ('../views/rep/bpdp.vue')
    },

    {
        path: '/rep/myop',
        name: 'rep/myop',
        meta: { layout: 'main', auth: true },
        component: () =>
            import ('../views/rep/myop.vue')
    },

    {
        path: '/rep/mpNIR',
        name: 'rep/mpNIR',
        meta: { layout: 'main', auth: true },
        component: () =>
            import ('../views/rep/mpNIR.vue')
    },

    {
        path: '/rep/mptp',
        name: 'rep/mptp',
        meta: { layout: 'main', auth: true },
        component: () =>
            import ('../views/rep/mptp.vue')
    },

    {
        path: '/rep/anip',
        name: 'rep/anip',
        meta: { layout: 'main', auth: true },
        component: () =>
            import ('../views/rep/anip.vue')
    },

    {
        path: '/rep/ani',
        name: 'rep/ani',
        meta: { layout: 'main', auth: true },
        component: () =>
            import ('../views/rep/ani.vue')
    },

    {
        path: '/rep/app',
        name: 'rep/app',
        meta: { layout: 'main', auth: true },
        component: () =>
            import ('../views/rep/app.vue')
    },

    {
        path: '/latex',
        name: 'latex',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/Latex.vue')
    },

    {
        path: '/ref',
        name: 'ref',
        meta: { layout: 'main', auth: true },
        component: () =>
            import ('../views/Ref.vue')
    },

    {
        path: '/pd',
        name: 'pd',
        meta: { layout: 'main', auth: true },
        component: () =>
            import ('../views/pd.vue')
    }
]



const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeResolve((to, from, next) => {
    if (to.path) {
        loader.loaderStart()
    }
    next()
});
router.beforeEach(async(to, from, next) => {
    const currentUser = firebase.auth().currentUser
    const requireAuth = to.matched.some(record => record.meta.auth)
    const requireAdmin = to.matched.some(record => record.meta.head)

    if (requireAuth && !currentUser) {
        next('/login?message=login')
    } else if (requireAuth && requireAdmin) {
        //console.log(currentUser)
        let user = (await firebase.database().ref(`/pHead/${currentUser.uid}/`).once('value')).val() || {}
            // console.log(Object.keys(this.user).length)
            //console.log(this.user.length)
        if (Object.keys(user).length != 0) {
            next()
        } else {
            next('/stud?error=rights')
        }
    } else next()
})
router.afterEach((to, from) => {
    setTimeout(function() {
        loader.loaderEnd();
    }, 888);
});

export default router