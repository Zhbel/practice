import Vue from 'vue'
import VueRouter from 'vue-router'
import Uimini from 'uimini/dist/css/uimini.css'
import VueToast from 'vue-toast-notification'
import Vuetify from 'vuetify'
import 'vue-toast-notification/dist/theme-default.css';



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
        meta: { layout: 'main' },
        component: () =>
            import ('../views/Stud.vue')
    },

    {
        path: '/pstud',
        name: 'pstud',
        meta: { layout: 'main' },
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
        meta: { layout: 'main' },
        component: () =>
            import ('../views/Head.vue')
    },

    {
        path: '/group',
        name: 'group',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/Group.vue')
    },

    {
        path: '/students',
        name: 'students',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/Students.vue')
    },

    {
        path: '/practice',
        name: 'practice',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/Practice.vue')
    },

    {
        path: '/rep/byop',
        name: 'rep/byop',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/rep/byop.vue')
    },

    {
        path: '/rep/byNIR',
        name: 'rep/byNIR',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/rep/byNIR.vue')
    },

    {
        path: '/rep/bptp',
        name: 'rep/bptp',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/rep/bptp.vue')
    },

    {
        path: '/rep/bpdp',
        name: 'rep/bpdp',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/rep/bpdp.vue')
    },

    {
        path: '/rep/myop',
        name: 'rep/myop',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/rep/myop.vue')
    },

    {
        path: '/rep/mpNIR',
        name: 'rep/mpNIR',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/rep/mpNIR.vue')
    },

    {
        path: '/rep/mptp',
        name: 'rep/mptp',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/rep/mptp.vue')
    },

    {
        path: '/rep/anip',
        name: 'rep/anip',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/rep/anip.vue')
    },

    {
        path: '/rep/ani',
        name: 'rep/ani',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/rep/ani.vue')
    },

    {
        path: '/rep/app',
        name: 'rep/app',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/rep/app.vue')
    },

    {
        path: '/latex',
        name: 'latex',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/Latex.vue')
    }
]



const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router