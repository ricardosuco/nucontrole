<template>
    <q-intersection transition="fade" transition-duration="1000">
        <router-view />
    </q-intersection>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'App',
})
</script>
