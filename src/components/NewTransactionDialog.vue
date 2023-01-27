<template>
    <div>
        <q-form ref="registerCard" @submit.prevent="onSubmit">
            <q-card class="q-pa-lg">
                <div class="text-h5 text-weight-regular main-color q-pb-lg">
                    <span>{{ title }}</span>
                    <q-btn style="top: 10px; right: 15px" class="absolute" round icon="close" flat v-close-popup />
                </div>
                <div class="row q-gutter-y-sm">
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <q-input v-model="register.description" label="Descrição" maxlength="50" counter outlined clear-icon="close" :rules="[(val) => !!val || 'Campo obrigatório']" no-error-icon/>
                    </div>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <div class="row q-col-gutter-md q-mb-md">
                            <div class="col-xs-6 col-md-6 col-lg-6">
                                <q-btn @click="setRegisterType('Despesa')" class="full-width q-pa-md text-subtitle1" unelevated :color="btnTypeColor.despesa" no-caps label="Despesa" />
                            </div>
                            <div class="col-xs-6 col-md-6 col-lg-6">
                                <q-btn @click="setRegisterType('Receita')" class="full-width q-pa-md text-subtitle1" unelevated :color="btnTypeColor.receita" no-caps label="Receita" />
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <div class="row q-col-gutter-md">
                            <div class="col-xs-6 col-md-6 col-lg-6">
                                <q-select v-model="register.month" :options="monthOptions" label="Mês" outlined emit-value clear-icon="close" :rules="[(val) => !!val || 'Campo obrigatório']" no-error-icon/>
                            </div>
                            <div class="col-xs-6 col-md-6 col-lg-6">
                                <q-select v-model="register.year" :options="yearOptions" label="Ano" outlined clear-icon="close" :rules="[(val) => !!val || 'Campo obrigatório']" no-error-icon/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <q-select v-model="register.category" :options="categoryOptions" label="Categoria" outlined clear-icon="close" :rules="[(val) => !!val || 'Campo obrigatório']" no-error-icon/>
                    </div>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <q-select v-model="register.status" :options="statusOptions" label="Status" outlined clear-icon="close" :rules="[(val) => !!val || 'Campo obrigatório']" no-error-icon/>
                    </div>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <q-input
                            v-model="register.value"
                            label="Valor"
                            outlined
                            reverse-fill-mask
                            inputmode="numeric"
                            fill-mask="0"
                            prefix="R$"
                            mask="#,##"
                            clear-icon="close"
                            :rules="[(val) => !!val || 'Campo obrigatório']"
                            no-error-icon
                        />
                    </div>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <q-btn class="full-width q-pa-md text-h6" no-caps text-color="white" unelevated color="positive" :label="isEdit ? 'Confirmar edição' : 'Adicionar'" type="submit" />
                    </div>
                </div>
            </q-card>
        </q-form>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import useApi from 'src/composables/UseApi'
import { monthOptions, yearOptions, currentDate } from 'src/services/services'
import { mapGetters } from 'vuex'

export default defineComponent({
    name: 'NewTransactionDialog',
    props: {
        title: {
            type: String,
            default: 'Novo registro',
        },

        isEdit: {
            type: Boolean,
            default: false,
        },

        editRegister: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        const { create, update } = useApi()
        return {
            create,
            update,
            monthOptions,
            yearOptions,
            statusOptions: ['Recebido', 'Pendente'],
            categoryOptions: ['Bônus', 'Rendimentos', 'Salário', 'Serviços', 'Outros'],
            register: {
                description: '',
                category: '',
                type: 'Despesa',
                value: '',
                status: '',
                month: this.currentDate().month,
                year: this.currentDate().year,
            },
        }
    },

    watch: {},

    computed: {
        ...mapGetters(['currentPeriod']),
        btnTypeColor() {
            const colors = {
                receita: this.register.type === 'Receita' ? 'primary' : 'teal-2',
                despesa: this.register.type === 'Despesa' ? 'primary' : 'teal-2',
            }
            return colors
        },
    },

    methods: {
        currentDate,
        async addNewRegister() {
            let newRegister = { ...this.register }
            newRegister.value = parseFloat(newRegister.value.replace(',', '.'))
            await this.create('registers', newRegister)
            await this.$store.dispatch('getList', this.currentPeriod)
            await this.$store.dispatch('getDataForCategoryChart')
            await this.$store.dispatch('getDataForStatusChart')
            this.$emit('onClose')
        },

        async updateRegister() {
            let { id, ...newRegister } = this.register
            if (typeof newRegister.value === 'string') newRegister.value = parseFloat(newRegister.value.replace(',', '.'))
            await this.update('registers', id, newRegister)
            await this.$store.dispatch('getList', this.currentPeriod)
            await this.$store.dispatch('getDataForCategoryChart')
            await this.$store.dispatch('getDataForStatusChart')
            this.$emit('onClose')
        },

        onSubmit() {
            if (this.isEdit) {
                this.updateRegister()
            } else {
                this.addNewRegister()
            }
        },

        setRegisterType(type) {
            this.register.type = type
            this.register.category = ''
            this.register.status = ''
            this.setOptions()
            this.$refs.registerCard.resetValidation()
        },

        setOptions() {
            if (this.register.type === 'Receita') {
                this.statusOptions = ['Recebido', 'Pendente']
                this.categoryOptions = ['Bônus', 'Rendimentos', 'Salário', 'Serviços', 'Outros']
            } else {
                this.statusOptions = ['Pago', 'Pendente']
                this.categoryOptions = ['Fixa', 'Variável', 'Reserva']
            }
        },
    },
    created() {
        if (this.isEdit) {
            this.register = { ...this.editRegister, value: this.editRegister.value.toFixed(2) }
        } 
        this.setOptions()
    },
})
</script>

<style scoped>
</style>