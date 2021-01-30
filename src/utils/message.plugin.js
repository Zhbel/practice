export default {
    install(Vue, options) {
        Vue.prototype.$message = function(text) {
            Vue.$toast.open({
                message: text,
                type: 'default',
                position: 'top-right'
            });
        }
        Vue.prototype.$error = function(text) {
            Vue.$toast.open({
                message: text,
                type: 'error',
                position: 'top-right'
            });
        }
        Vue.prototype.$success = function(text) {
            Vue.$toast.open({
                message: text,
                type: 'success',
                position: 'top-right'
            });
        }
    },

}