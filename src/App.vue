<template>
    <q-intersection transition="fade" transition-duration="1000">
        <router-view />
    </q-intersection>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

function isOnline() {
    return window.navigator.onLine
}

export default defineComponent({
    name: 'App',

    created() {
        if (!isOnline()) {
            this.$q.loading.show({
                html: true,
                message: 'Parece que você está offline.<br/> Por favor, verifique sua conexão com a internet para continuar.',
                spinnerSize: 0,
                messageColor: 'white',
                customClass: 'bg-primary text-h6',
            })
        }
    },
})
</script>
