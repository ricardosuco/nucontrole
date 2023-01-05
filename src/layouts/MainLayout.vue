<template>
    <q-layout>
        <Header />
        <q-page-container class="container-bg container-padding">
            <Transition name="slide-fade">
                <router-view />
            </Transition>
        </q-page-container>
        <q-page-sticky class="print-hide" :offset="[10, 20]" position="bottom-right" style="z-index: 1000">
            <q-btn @click="showDialog = true" round color="positive" icon="add" :size="$q.platform.is.desktop ? 'lg' : 'md'">
                <q-tooltip class="text-subtitle2">Adicionar registro</q-tooltip>
            </q-btn>
        </q-page-sticky>
        <q-dialog :maximized="$q.platform.is.desktop ? false : true" v-model="showDialog">
            <NewTransactionDialog @closeModal="closeModal()" />
        </q-dialog>
    </q-layout>
</template>

<script lang="ts">
import Header from 'components/Header.vue'
import NewTransactionDialog from 'components/NewTransactionDialog.vue'

import { defineComponent } from 'vue'

export default defineComponent({
    name: 'MainLayout',

    components: {
        Header,
        NewTransactionDialog,
    },

    data() {
        return {
            showDialog: false,
        }
    },

    methods: {
        closeModal() {
            this.showDialog = false
        },
    },
})
</script>

<style lang="scss" scoped>
.container-bg {
    background-color: #edeaef;
}

.container-padding {
    padding: 4rem 0;
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
