<template>
<router-view/>
</template>

<script>
import messages from '@/utils/messages'

export default {
    computed: {
        error() {
            return this.$store.getters.error
        }
    },
    watch: {
        error(fbError) {
            //console.log(fbError)
            this.$error(messages[fbError.code] || 'Что-то пошло не так')
        }
    },
}
</script>

<style lang="scss">
</style>