<template>
    <div class="flex justify-between q-gutter-md">
        <div>
            <q-card class="card-size border-card" flat>
                <apexchart width="330" :options="typeGraphic" :series="[totalIncome, totalExpenses]"></apexchart>
            </q-card>
        </div>
        <q-card class="card-size border-card" flat>
            <div>
                <apexchart width="330" :options="categoryGraphic" :series="categorySeries"></apexchart>
            </div>
        </q-card>
        <q-card class="card-size border-card" flat>
            <div>
                <apexchart width="330" :options="statusGraphic" :series="statusSeries"></apexchart>
            </div>
        </q-card>
    </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import { mapGetters } from 'vuex'
import useApi from 'src/composables/UseApi'
import VueApexCharts from 'vue3-apexcharts'
import _, { cloneDeep, Object } from 'lodash'

let categoryLabels: Array<string> = []
let statusLabels: Array<string> = []

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
            categorySeries: [] as Array<number>,
            statusSeries: [] as Array<number>,
            configChart: {
                 chart: {
                    width: 380,
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
            }
        }
    },

    computed: {
        ...mapGetters(['totalIncome', 'totalExpenses']),

        categoryGraphic(): object {
            let options = cloneDeep(this.configChart)
            options.title.text = 'Categoria'
            options.labels = categoryLabels
            return options
        },

        statusGraphic(): object {
            let options = cloneDeep(this.configChart)
            options.title.text = 'Status'
            options.labels = statusLabels
            return options
        },

        typeGraphic(): object {
            let options = cloneDeep(this.configChart)
            options.title.text = 'Tipo'
            options.labels = ['Receitas', 'Despesas']
            return options
        },
    },

    async created() {
        let response = await this.getByCategory('Receita')
        response?.forEach((item) => {
            categoryLabels.push(item.category)
            this.categorySeries.push(item.value)
        })

        let response2 = await this.getByStatus('Despesa')
        response2?.forEach((item) => {
            statusLabels.push(item.status)
            this.statusSeries.push(item.value)
        })
    },

    beforeUnmount() {
        // VueApexCharts.destroy()
    },
})
</script>

<style lang="scss" scoped>
.card-size {
    min-width: 340px;
    min-height: 240px;
}

.border-card {
    border: 2px solid #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 8px rgb(98 115 132 / 4%), 0 0 4px rgb(98 115 132 / 12%);
}

</style>
