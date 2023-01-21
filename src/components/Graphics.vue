<template>
    <div class="flex justify-around q-gutter-y-lg">
        <div>
            <q-card class="border-card" flat>
                <apexchart width="520" :options="typeGraphic" :series="[totalIncome, totalExpenses]"></apexchart>
            </q-card>
        </div>
        <q-card class="border-card" flat>
            <div>
                <apexchart width="520" :options="categoryGraphic" :series="categorySeries"></apexchart>
            </div>
        </q-card>
        <q-card class="border-card" flat>
            <div>
                <apexchart width="520" :options="statusGraphic" :series="statusSeries"></apexchart>
            </div>
        </q-card>
    </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import { formatCurrency } from 'src/services/services'
import { mapGetters } from 'vuex'
import useApi from 'src/composables/UseApi'
import VueApexCharts from 'vue3-apexcharts'
import _, { cloneDeep } from 'lodash'

export default defineComponent({
    name: 'Graphics',
    components: {
        apexchart: VueApexCharts,
    },
    data() {
        const { getByCategory, getByStatus } = useApi()
        return {
            getByCategory,
            getByStatus,
            categoryLabels: [] as Array<string>,
            statusLabels: [] as Array<string>,
            categorySeries: [] as Array<number>,
            statusSeries: [] as Array<number>,
            configChart: {
                chart: {
                    width: 520,
                    type: 'donut',
                },
                title: {
                    text: 'Status',
                    align: 'center',
                    margin: 25,
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold',
                        fontFamily: 'Poppins, sans-serif',
                        color: '#363F5F',
                    },
                },
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    y: {
                        formatter: function (val: number) {
                            return formatCurrency(val)
                        },
                    },
                },
                labels: [] as Array<string>,
                responsive: [
                    {
                        breakpoint: 600,
                        options: {
                            chart: {
                                width: 360,
                            },
                            legend: {
                                position: 'bottom',
                            },
                        },
                    },
                ],
            },
        }
    },

    watch: {
        async currentType() {
            await this.fetchCategoryData()
            await this.fetchStatusData()
        },
    },

    computed: {
        ...mapGetters(['totalIncome', 'totalExpenses', 'currentType']),

        categoryGraphic(): object {
            let options = cloneDeep(this.configChart)
            options.title.text = 'Categoria'
            options.labels = [...this.categoryLabels]
            return options
        },

        statusGraphic(): object {
            let options = cloneDeep(this.configChart)
            options.title.text = 'Status'
            options.labels = [...this.statusLabels]
            return options
        },

        typeGraphic(): object {
            let options = cloneDeep(this.configChart)
            options.title.text = 'Tipo'
            options.labels = ['Receitas', 'Despesas']
            return options
        },
    },

    methods: {
        async fetchCategoryData(): Promise<void> {
            this.clearArrsCategory()
            let response = await this.$store.dispatch('getDataForCategoryChart')
            response?.forEach((item: any) => {
                this.categoryLabels.push(item.category)
                this.categorySeries.push(item.value)
            })
        },

        async fetchStatusData(): Promise<void> {
            this.clearArrsStatus()
            let response = await this.$store.dispatch('getDataForStatusChart')
            response?.forEach((item: any) => {
                this.statusLabels.push(item.status)
                this.statusSeries.push(item.value)
            })
        },

        clearArrsStatus(): void {
            this.statusLabels = []
            this.statusSeries = []
        },

        clearArrsCategory(): void {
            this.categoryLabels = []
            this.categorySeries = []
        },
    },

    async created() {
        await this.fetchCategoryData()
        await this.fetchStatusData()
    },

    beforeUnmount() {
        this.clearArrsStatus()
        this.clearArrsCategory()
    },
})
</script>

<style lang="scss" scoped>
.border-card {
    border: 2px solid #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 8px rgb(98 115 132 / 4%), 0 0 4px rgb(98 115 132 / 12%);
}
</style>
