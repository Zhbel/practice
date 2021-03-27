import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(Loading);

let loader = Vue.$loading.show({
    loader: 'dots',
    color: '#444ce0',
    zIndex: 999,
});

// function loaderStart() {
//     loader;
// }

// function loaderEnd() {
//     loader.hide();
// }

function loaderStart() {
    loader.isActive = true;
}

function loaderEnd() {
    loader.isActive = false;
}

export default { loaderStart, loaderEnd }