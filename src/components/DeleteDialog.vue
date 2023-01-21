<template>
    <q-card class="q-pa-lg">
        <q-card-section class="row items-center text-center q-mb-md">
            <div class="text-h6 text-primary">Tem certeza que deseja excluir o registro ?</div>
        </q-card-section>
        <div class="row q-col-gutter-lg">
            <div class="col-xs-12 col-md-6 col-lg-6">
                <q-btn class="full-width q-pa-sm" size="lg" no-caps color="positive" unelevated label="Confirmar" @click="deleteRegister()" />
            </div>
            <div class="col-xs-12 col-md-6 col-lg-6">
                <q-btn class="full-width q-pa-sm" outline color="negative" size="lg" no-caps label="Cancelar" v-close-popup />
            </div>
        </div>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useApi from 'src/composables/UseApi'
import { mapGetters } from 'vuex'
export default defineComponent({
    name: 'DeleteDialog',
    props: {
        id: {
            type: Number,
            required: true,
        },
    },
    data() {
        const { remove } = useApi()
        return {
            remove,
        }
    },

    computed: {
        ...mapGetters(['currentPeriod'])
    },

    methods: {
        async deleteRegister() {
            await this.remove('registers', this.id)
            await this.$store.dispatch('getList', this.currentPeriod)
            this.$emit('onClose')
        },
    },
})
</script>

<style lang="scss" scoped>
</style>