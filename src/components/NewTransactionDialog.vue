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
                        <q-input v-model="register.description" label="Descrição" outlined clear-icon="close" :rules="[(val) => !!val || 'Campo obrigatório']" />
                    </div>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <div class="row q-col-gutter-md q-mb-md">
                            <div class="col-xs-12 col-md-6 col-lg-6">
                                <q-btn @click="setRegisterType('Receita')" class="full-width q-pa-md text-subtitle1" unelevated :color="btnTypeColor.receita" no-caps label="Receita" />
                            </div>
                            <div class="col-xs-12 col-md-6 col-lg-6">
                                <q-btn @click="setRegisterType('Despesa')" class="full-width q-pa-md text-subtitle1" unelevated :color="btnTypeColor.despesa" no-caps label="Despesa" />
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <q-select v-model="register.category" :options="categoryOptions" label="Categoria" outlined clear-icon="close" :rules="[(val) => !!val || 'Campo obrigatório']" />
                    </div>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <q-select v-model="register.status" :options="statusOptions" label="Status" outlined clear-icon="close" :rules="[(val) => !!val || 'Campo obrigatório']" />
                    </div>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <q-input
                            v-model="register.value"
                            label="Valor"
                            outlined
                            reverse-fill-mask
                            fill-mask="0"
                            prefix="R$"
                            mask="#,##"
                            clear-icon="close"
                            :rules="[(val) => !!val || 'Campo obrigatório']"
                        />
                    </div>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <q-btn class="full-width q-pa-md text-h6" no-caps text-color="white" unelevated color="positive" label="Adicionar" type="submit" />
                    </div>
                </div>
            </q-card>
        </q-form>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import useApi from 'src/composables/UseApi'

export default defineComponent({
    name: 'NewTransactionDialog',
    props: {
        title: {
            type: String,
            default: 'Novo registro',
            required: true,
        },

        isEdit: {
            type: Boolean,
            default: false,
            required: true,
        },

        editRegister: {
            type: Object,
            default: () => ({}),
            required: true,
        },
    },
    data() {
        const { create, update } = useApi()
        return {
            create,
            update,
            statusOptions: ['Recebido', 'Pendente'],
            categoryOptions: ['Bônus', 'Rendimentos', 'Salário', 'Serviços', 'Outros'],
            register: {
                description: '',
                category: '',
                type: 'Receita',
                value: '',
                status: '',
            },
        }
    },

    watch: {
    },

    computed: {
        btnTypeColor() {
            const colors = {
                receita: this.register.type === 'Receita' ? 'teal-10' : 'teal-2',
                despesa: this.register.type === 'Despesa' ? 'teal-10' : 'teal-2',
            }
            return colors
        },
    },

    methods: {
        async addNewRegister() {
            let newRegister = { ...this.register }
            newRegister.value = parseFloat(newRegister.value.replace(',', '.'))
            await this.create('registers', newRegister)
            await this.$store.dispatch('getList')
            this.$emit('closeModal')
        },

        async updateRegister() {
            let { id, ...newRegister } = this.register
            if (typeof newRegister.value === 'string') 
            newRegister.value = parseFloat(newRegister.value.replace(',', '.'))
            await this.update('registers', id, newRegister)
            await this.$store.dispatch('getList')
            this.$emit('closeModal')
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
            this.register = { ...this.editRegister }
        }
    },
})
</script>

<style scoped>
</style>