<template>
    <q-card class="q-pa-lg card-width">
        <div class="text-h5 text-weight-regular main-color q-pb-lg">
            <span>Filtrar registros</span>
            <q-btn style="top: 10px; right: 15px" class="absolute" round icon="close" flat v-close-popup />
        </div>
        <div class="row q-col-gutter-md">
            <div class="col-xs-12 col-md-12 col-lg-12">
                <div class="row q-col-gutter-x-md">
                    <div class="col-xs-6 col-md-6 col-lg-6">
                        <q-select v-model="period.month" :options="monthOptions" label="Mês" outlined emit-value clear-icon="close" :rules="[(val) => !!val || 'Campo obrigatório']" />
                    </div>
                    <div class="col-xs-6 col-md-6 col-lg-6">
                        <q-select v-model="period.year" :options="yearOptions" label="Ano" outlined clear-icon="close" :rules="[(val) => !!val || 'Campo obrigatório']" />
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-md-12 col-lg-12">
                <q-btn @click="filterByPeriod(false)" class="full-width q-pa-sm" size="lg" no-caps color="secondary" unelevated label="Filtrar período" v-close-popup />
            </div>
            <div class="col-xs-12 col-md-12 col-lg-12">
                <q-btn @click="filterByPeriod(true)" class="full-width q-pa-sm" size="lg" no-caps color="primary" unelevated label="Exibir todos" v-close-popup />
            </div>
            <div class="col-xs-12 col-md-12 col-lg-12">
                <q-btn class="full-width q-pa-sm" outline color="primary" size="lg" no-caps label="Voltar" v-close-popup />
            </div>
        </div>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { monthOptions, yearOptions, currentDate } from 'src/services/services'
import { Period } from 'src/models'
export default defineComponent({
    name: 'FilterDialog',
    data() {
        return {
            monthOptions,
            yearOptions,
            period: {
                month: this.currentDate().month,
                year: this.currentDate().year,
            } as Period,
        }
    },

    methods: {
        currentDate,
        async filterByPeriod(allRegister: boolean) {
            try {
                this.$q.loading.show()
                if (allRegister) {
                    await this.$store.dispatch('getList', null)
                    this.$q.localStorage.remove('period')
                } else {
                    await this.$store.dispatch('getList', this.period)
                    this.$q.localStorage.set('period', this.period)
                }
            } catch (error: any) {
                this.$q.notify({
                    message: error,
                    type: 'negative',
                })
            }
            this.$q.loading.hide()
        },
    },
})
</script>

<style lang="scss" scoped>
.card-width {
    max-width: 380px;
}
</style>