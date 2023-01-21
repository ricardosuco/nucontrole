<template>
    <div class="row col-xs-12 col-md-12 col-lg-12 q-col-gutter-lg q-mb-md">
        <div class="col-xs-12 col-md-3 col-lg-3">
            <q-btn @click="showDialogFilter = true" size="18px" no-caps icon="filter_list" class="full-width q-px-lg q-py-sm" color="accent" unelevated label="Filtrar" />
        </div>
        <div class="col-xs-12 col-md-3 col-lg-3">
            <q-btn
                @click="showCharts = !showCharts"
                size="18px"
                no-caps
                class="full-width q-px-lg q-py-sm"
                :icon="showCharts ? 'table_rows' : 'donut_large'"
                color="accent"
                unelevated
                :label="showCharts ? 'Tabela' : 'Gráficos'"
            />
        </div>
        <div v-if="showCharts" class="col-xs-12 col-md-3 col-lg-3">
            <q-btn @click="switchType" size="18px" no-caps icon="swap_horiz" class="full-width q-px-lg q-py-sm" color="accent" unelevated label="Alterar tipo" />
        </div>

        <div v-if="!showCharts" class="col-xs-12 col-md-3 col-lg-3">
            <q-btn
                @click="exportCsv(allRegisters, totalIncome, totalExpenses, totalBalance)"
                size="18px"
                no-caps
                icon="file_download"
                class="full-width q-px-lg q-py-sm"
                color="accent"
                unelevated
                label="Exportar"
            />
        </div>
        <div class="col-xs-12 col-md-3 col-lg-3">
            <q-btn @click="showCopyRegistersDialog = !showCopyRegistersDialog" size="18px" no-caps icon="history" class="full-width q-px-lg q-py-sm" color="accent" unelevated label="Copiar registros" />
        </div>
    </div>
    <q-dialog v-model="showDialogFilter">
        <FilterDialog />
    </q-dialog>
    <q-dialog v-model="showCopyRegistersDialog" >
        <CopyRegistersDialog @closeRegistersCopyDialog="closeRegistersCopyDialog($event)"/>
    </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { exportCsv } from 'src/services/services'
import FilterDialog from './FilterDialog.vue'
import CopyRegistersDialog from 'components/CopyRegistersDialog.vue'
import { mapGetters } from 'vuex'

export default defineComponent({
    name: 'Toolbar',
    components: { FilterDialog, CopyRegistersDialog },

    data() {
        return {
            showCharts: false,
            showDialogFilter: false,
            showCopyRegistersDialog: false,
        }
    },

    watch: {
        showCharts() {
            if (this.showCharts) {
                this.$emit('switchContent', 'Graphics')
            } else this.$emit('switchContent', 'Table')
        },
    },

    computed: {
        ...mapGetters(['allRegisters', 'totalIncome', 'totalExpenses', 'totalBalance', 'currentType']),
    },

    methods: {
        exportCsv,
        switchType() {
            this.currentType === 'Despesa' ? this.$store.commit('SET_CURRENT_TYPE', 'Receita') : this.$store.commit('SET_CURRENT_TYPE', 'Despesa')
        },

        closeRegistersCopyDialog(event: object) {
            this.showCopyRegistersDialog = false
            this.$store.dispatch('getList', event)
        },
    },
})
</script>

<style scoped>
</style>