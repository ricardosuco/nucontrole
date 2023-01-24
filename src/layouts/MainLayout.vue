<template>
    <q-intersection transition="fade" transition-duration="1000">
        <q-layout view="lHh Lpr lFf">
            <Header ref="header" />
            <q-page-container class="container-bg container-padding">
                <router-view :showCharts="showCharts" />
                <footer>
                    <div class="flex justify-center">
                        <span class="text-subtitle2 text-primary"> Developed by <a style="text-decoration: none" href="https://www.linkedin.com/in/avelinodev/" target="_blank">avelinodev</a></span>
                    </div>
                </footer>
            </q-page-container>
            <q-footer v-if="$q.screen.lt.sm" class="bg-secondary" bordered>
                <q-tabs indicator-color="transparent" switch-indicator class="text-white">
                    <q-tab @click="showDialogNewTransaction = !showDialogNewTransaction" name="addRegister" icon="add">
                        <q-tooltip style="width: 160px"> Adicionar registro </q-tooltip>
                    </q-tab>
                    <q-tab @click="showDialogFilter = true" name="filter" icon="filter_list">
                        <q-tooltip> Filtrar registros </q-tooltip>
                    </q-tab>
                    <q-tab @click="showCopyRegistersDialog = true" name="copy" icon="history">
                        <q-tooltip> Copiar registros </q-tooltip>
                    </q-tab>
                    <!-- <q-tab @click="showCharts = !showCharts" name="charts" :icon="showCharts ? 'table_rows' : 'donut_large'">
                        <q-tooltip> {{ showCharts ? 'Tabeals' : 'Gráficos' }} </q-tooltip>
                    </q-tab>
                    <q-tab v-if="showCharts" name="swap" icon="swap_horiz">
                        <q-tooltip> Alterar tipo </q-tooltip>
                    </q-tab>
                    <q-tab v-if="!showCharts" @click="exportCsv(allRegisters, totalIncome, totalExpenses, totalBalance)" name="charts" icon="file_download">
                        <q-tooltip> Exportar </q-tooltip>
                    </q-tab> -->
                    <q-tab @click="handleLogout" name="logout" icon="logout">
                        <q-tooltip> Sair </q-tooltip>
                    </q-tab>
                </q-tabs>
            </q-footer>
            <q-page-sticky v-if="$q.screen.gt.xs" class="print-hide" :offset="[10, 20]" position="bottom-right" style="z-index: 1000">
                <q-btn @click="showDialogNewTransaction = true" round color="positive" icon="add" size="lg">
                    <q-tooltip class="text-subtitle2">Adicionar registro</q-tooltip>
                </q-btn>
            </q-page-sticky>
            <!-- <q-page-sticky v-if="$q.screen.gt.xs" class="print-hide" :offset="[10, 20]" position="bottom-left" style="z-index: 1000">
                <q-btn @click="$refs.header.isShowValues = !$refs.header.isShowValues" round color="primary" :icon="isShowValues ? 'visibility' : 'visibility_off'" size="lg">
                    <q-tooltip class="text-subtitle2">Mostrar valores</q-tooltip>
                </q-btn>
            </q-page-sticky> -->
            <q-dialog persistent :maximized="$q.platform.is.desktop ? false : true" v-model="showDialogNewTransaction">
                <NewTransactionDialog @onClose="onClose" />
            </q-dialog>
            <q-dialog persistent v-model="showDialogFilter">
                <FilterDialog />
            </q-dialog>
            <q-dialog persistent v-model="showCopyRegistersDialog">
                <CopyRegistersDialog @closeRegistersCopyDialog="closeRegistersCopyDialog($event)" />
            </q-dialog>
        </q-layout>
    </q-intersection>
</template>

<script lang="ts">
import Header from 'components/Header.vue'
import NewTransactionDialog from 'components/NewTransactionDialog.vue'
import CopyRegistersDialog from 'components/CopyRegistersDialog.vue'
import Graphics from 'components/Graphics.vue'
import FilterDialog from 'components/FilterDialog.vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { mapGetters } from 'vuex'
import { exportCsv } from 'src/services/services'
import { defineComponent } from 'vue'
import { konamiCodeSilvioSantos } from 'src/services/services'

konamiCodeSilvioSantos()

export default defineComponent({
    name: 'MainLayout',

    components: {
        Header,
        NewTransactionDialog,
        Graphics,
        FilterDialog,
        CopyRegistersDialog,
    },

    data() {
        const { logout } = useAuthUser()
        return {
            logout,
            showDialogNewTransaction: false,
            showCharts: false,
            showDialogFilter: false,
            showCopyRegistersDialog: false,
        }
    },

    computed: {
        ...mapGetters(['allRegisters', 'totalIncome', 'totalExpenses', 'totalBalance']),
    },

    methods: {
        exportCsv,
        onClose() {
            this.showDialogNewTransaction = false
        },
        async handleLogout() {
            await this.logout()
            this.$router.push('/login')
        },
        closeRegistersCopyDialog(event: object) {
            this.showCopyRegistersDialog = false
            this.$store.dispatch('getList', event)
        },
    },
})
</script>

<style lang="scss" scoped>
.container-bg {
    background-color: #edeaef;
}

.container-padding {
    padding: 3rem 0;
}
</style>
