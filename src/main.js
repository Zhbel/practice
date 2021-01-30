import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlugin from '@/utils/message.plugin'
import VueLaTeX2JS from 'latex2vue';


import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.use(VueLaTeX2JS);

firebase.initializeApp({
    apiKey: "AIzaSyBAQnNX_8mTXNNZYm-YPMtZBzb-G_ilg_Q",
    authDomain: "practice-610f2.firebaseapp.com",
    databaseURL: "https://practice-610f2.firebaseio.com",
    projectId: "practice-610f2",
    storageBucket: "practice-610f2.appspot.com",
    messagingSenderId: "450368647362",
    appId: "1:450368647362:web:bbf6e6caa790daf5df0b5b",
    measurementId: "G-MTHV8JV0YY"

    /*apiKey: "AIzaSyA-2cMxBJKPxeliTpcqFxIq1MblmAmVnqE",
    authDomain: "practice-vtik.firebaseapp.com",
    databaseURL: "https://practice-vtik-default-rtdb.firebaseio.com",
    projectId: "practice-vtik",
    storageBucket: "practice-vtik.appspot.com",
    messagingSenderId: "639221205095",
    appId: "1:639221205095:web:a5b56c5e151a0f350fecc2",
    measurementId: "G-NG2LT18B0B"*/
})

let app

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
})