<template>
    <q-card class="q-pa-md">
        <q-card-section class="row items-center text-center q-mb-md">
            <div class="text-subtitle1 text-primary">Para finalizar o cadastro verifique a mensagem de confirmação enviada para o seu endereço de email</div>
        </q-card-section>
        <div class="row q-col-gutter-lg">
            <div class="col-xs-12 col-md-12 col-lg-12 text-center">
                <q-btn class="q-px-xl" size="lg" no-caps color="secondary" unelevated label="Entendido" v-close-popup />
            </div>
        </div>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'DialogNewUserConfirmation',

    data() {
        return {}
    },

    methods: {},
    
    
})
</script>

<style lang="scss" scoped>
</style>