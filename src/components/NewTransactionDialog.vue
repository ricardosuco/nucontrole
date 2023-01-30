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
                        <q-input v-model="register.description" label="Descrição" maxlength="50" counter outlined clear-icon="close" :rules="[(val) => !!val || 'Campo obrigatório']" no-error-icon />
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
                                <q-select
                                    v-model="register.month"
                                    :options="monthOptions"
                                    label="Mês"
                                    outlined
                                    emit-value
                                    clear-icon="close"
                                    :rules="[(val) => !!val || 'Campo obrigatório']"
                                    no-error-icon
                                />
                            </div>
                            <div class="col-xs-6 col-md-6 col-lg-6">
                                <q-select v-model="register.year" :options="yearOptions" label="Ano" outlined clear-icon="close" :rules="[(val) => !!val || 'Campo obrigatório']" no-error-icon />
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <q-select v-model="register.category" :options="categoryOptions" label="Categoria" outlined clear-icon="close" :rules="[(val) => !!val || 'Campo obrigatório']" no-error-icon />
                    </div>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <div class="row q-col-gutter-md q-mb-md">
                            <div class="col-xs-6 col-md-6 col-lg-6">
                                <q-btn @click="setRegisterStatus('Pendente')" class="full-width q-pa-md text-subtitle1" unelevated :color="btnStatusColor.pendente" no-caps label="Pendente" />
                            </div>
                            <div class="col-xs-6 col-md-6 col-lg-6">
                                <q-btn
                                    v-if="register.type === 'Receita'"
                                    @click="setRegisterStatus('Recebido')"
                                    class="full-width q-pa-md text-subtitle1"
                                    unelevated
                                    :color="btnStatusColor.recebido"
                                    no-caps
                                    label="Recebido"
                                />
                                <q-btn v-else @click="setRegisterStatus('Pago')" class="full-width q-pa-md text-subtitle1" unelevated :color="btnStatusColor.pago" no-caps label="Pago" />
                            </div>
                        </div>
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
            categoryOptions: ['Bônus', 'Rendimentos', 'Salário', 'Serviços', 'Outros'],
            register: {
                description: '',
                category: '',
                type: 'Despesa',
                value: '',
                status: 'Pendente',
                month: this.currentDate().month,
                year: this.currentDate().year,
            },
        }
    },

    watch: {},

    computed: {
        btnTypeColor() {
            const colors = {
                receita: this.register.type === 'Receita' ? 'primary' : 'teal-2',
                despesa: this.register.type === 'Despesa' ? 'primary' : 'teal-2',
            }
            return colors
        },

        btnStatusColor() {
            const colors = {}
            if (this.register.type === 'Receita') {
                colors.recebido = this.register.status === 'Recebido' ? 'primary' : 'teal-2'
                colors.pendente = this.register.status === 'Pendente' ? 'primary' : 'teal-2'
            } else {
                colors.pago = this.register.status === 'Pago' ? 'primary' : 'teal-2'
                colors.pendente = this.register.status === 'Pendente' ? 'primary' : 'teal-2'
            }
            return colors
        }
    },

    methods: {
        currentDate,
        async addNewRegister() {
            let newRegister = { ...this.register }
            newRegister.value = parseFloat(newRegister.value.replace(',', '.'))
            try {
                this.$q.loading.show()
                await this.create('registers', newRegister)
                this.$q.notify({
                    html: true,
                    message: 'Novo registro adicionado! <span style="font-size: 20px">&#128522;</span>',
                    type: 'positive',
                    position: 'top',
                })
                this.$emit('onClose')
            } catch (error) {
                this.$q.notify({
                    html: true,
                    message: 'Ops, ocorreu um erro ao adicionar o registro... <span style="font-size: 20px">&#128549;</span>',
                    type: 'negative',
                    position: 'top',
                })
            }
            this.$q.loading.hide()
        },

        async updateRegister() {
            let { id, ...newRegister } = this.register
            if (typeof newRegister.value === 'string') newRegister.value = parseFloat(newRegister.value.replace(',', '.'))
            try {
                this.$q.loading.show()
                await this.update('registers', id, newRegister)
                this.$q.notify({
                    html: true,
                    message: 'Registro atualizado! <span style="font-size: 20px">&#128522;</span>',
                    type: 'positive',
                    position: 'top',
                })
                this.$emit('onClose')
            } catch (error) {
                this.$q.notify({
                    html: true,
                    message: 'Ops, ocorreu um erro ao atualizar o registro... <span style="font-size: 20px">&#128549;</span>',
                    type: 'negative',
                    position: 'top',
                })
            }
            this.$q.loading.hide()
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
            this.setOptions()
            this.$refs.registerCard.resetValidation()
        },

        setRegisterStatus(status) {
            this.register.status = status
        },

        setOptions() {
            if (this.register.type === 'Receita') {
                this.categoryOptions = ['Bônus', 'Rendimentos', 'Salário', 'Serviços', 'Outros']
                this.register.status === 'Pago' ? this.register.status = 'Recebido' : 'Pendente'
            } else {
                this.categoryOptions = ['Fixa', 'Variável', 'Reserva']
                this.register.status === 'Recebido' ? this.register.status = 'Pago' : 'Pendente'
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