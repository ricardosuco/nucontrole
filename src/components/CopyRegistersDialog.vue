<template>
    <div>
        <q-form @submit.prevent="copyRegisters">
            <q-card class="card-width q-pa-lg">
                <div class="text-h5 text-weight-regular main-color q-pb-lg">
                    <span>Copiar registros</span>
                    <q-btn style="top: 10px; right: 15px" class="absolute" round icon="close" flat v-close-popup />
                </div>
                <div class="row q-gutter-y-sm">
                    <label class="text-subtitle text-weight-regular main-color">Copiar de:</label>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <div class="row q-col-gutter-md">
                            <div class="col-xs-6 col-md-6 col-lg-6">
                                <q-select v-model="month" :options="monthOptions" label="Mês" outlined emit-value clear-icon="close" :rules="[(val) => !!val || 'Campo obrigatório']" no-error-icon/>
                            </div>
                            <div class="col-xs-6 col-md-6 col-lg-6">
                                <q-select v-model="year" :options="yearOptions" label="Ano" outlined clear-icon="close" :rules="[(val) => !!val || 'Campo obrigatório']" no-error-icon/>
                            </div>
                        </div>
                    </div>
                    <label class="text-subtitle text-weight-regular main-color">Para:</label>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <div class="row q-col-gutter-md">
                            <div class="col-xs-6 col-md-6 col-lg-6">
                                <q-select v-model="newMonth" :options="monthOptions" label="Mês" outlined emit-value clear-icon="close" :rules="[(val) => !!val || 'Campo obrigatório']" no-error-icon/>
                            </div>
                            <div class="col-xs-6 col-md-6 col-lg-6">
                                <q-select v-model="newYear" :options="yearOptions" label="Ano" outlined clear-icon="close" :rules="[(val) => !!val || 'Campo obrigatório']" no-error-icon/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <q-btn class="full-width q-pa-md text-h6" no-caps text-color="white" unelevated color="positive" label="Copiar" type="submit" />
                    </div>
                </div>
            </q-card>
        </q-form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useApi from 'src/composables/UseApi'
import { monthOptions, yearOptions, currentDate } from 'src/services/services'
import { mapGetters } from 'vuex'

export default defineComponent({
    name: 'CopyRegistersDialog',
    data() {
        const { copyRegistersByPeriod } = useApi()
        return {
            copyRegistersByPeriod,
            monthOptions,
            yearOptions,
            month: '',
            year: '',
            newMonth: '',
            newYear: '',
        }
    },

    watch: {},

    computed: {
        ...mapGetters(['currentPeriod']),
    },

    methods: {
        currentDate,

        async copyRegisters() {
            try {
                this.$q.loading.show()
                await this.copyRegistersByPeriod({
                    month_copy_input: this.month,
                    year_copy_input: Number(this.year),
                    new_month_input: this.newMonth,
                    new_year_input: Number(this.newYear),
                })
                this.$emit('closeRegistersCopyDialog', { month: this.newMonth, year: this.newYear })
                this.$q.notify({
                    message: 'Registros copiados!',
                    type: 'positive',
                    position: 'top',
                })
            } catch (error: any) {
                this.$q.notify({
                    message: error.message,
                    type: 'negative',
                })
            }
            this.$q.loading.hide()
        },
    },
    created() {},
})
</script>

<style scoped>
.card-width {
    max-width: 380px;
}
</style>