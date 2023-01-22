<template>
    <q-page padding class="wrapper">
        <div>
            <Toolbar @switchContent="switchContent($event)" />
            <component :rows="allRegisters" :is="currentComponent"></component>
        </div>
        <!-- <div class="text-justify q-pa-md q-mt-md text-subtitle1 main-color">
            <div class="text-center text-h6 text-weight-regular q-mb-md">Por quê ?</div>
            <p>
                O controle financeiro permite a uma pessoa ou empresa gerenciar suas finanças de maneira eficiente, acompanhar suas receitas e despesas, planejar orçamentos, identificar problemas
                financeiros e tomar decisões informadas. Isso pode ajudar a evitar dívidas desnecessárias, maximizar lucros e alcançar metas financeiras a longo prazo. Além disso, um bom controle
                financeiro pode ajudar a garantir que você tenha dinheiro suficiente para gastos imprevistos ou emergências e ajudar a garantir segurança financeira a longo prazo.
            </p>
        </div> -->
    </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from 'components/Card.vue'
import Table from 'components/Table.vue'
import Graphics from 'components/Graphics.vue'
import Toolbar from 'components/Toolbar.vue'
import { mapGetters } from 'vuex'
import { Period } from 'src/models'

export default defineComponent({
    name: 'PageIndex',
    props: {
        showCharts: {
            type: Boolean,
            default: false,
        },
    },
    components: { Card, Table, Graphics, Toolbar },
    data() {
        return {
            currentComponent: 'Table',
        }
    },

    watch: {
        showCharts() {
            if (this.showCharts) {
                this.currentComponent = 'Graphics'
            } else this.currentComponent = 'Table'
        },
    },

    computed: {
        ...mapGetters(['allRegisters', 'currentType']),

        currentPeriodInLocalStorage(): object | null {
            if (this.$q.localStorage.has('period')) {
                let period = this.$q.localStorage.getItem('period') as Period
                return period
            }
            return null
        },
    },

    methods: {
        switchContent(event: string) {
            this.currentComponent = event
        },
    },

    async created() {
        this.$q.loading.show()
        await this.$store.dispatch('getList', this.currentPeriodInLocalStorage)
        this.$q.loading.hide()
    },
})
</script>
<style lang="scss" scoped>
</style>
