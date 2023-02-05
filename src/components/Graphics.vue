<template>
    <div class="q-mt-xl main-color text-center" v-if="isEmpty">
        <span>Nenhum registro encontrado para o período selecionado</span>
    </div>
    <div v-else class="flex justify-around q-gutter-y-lg">
        <div>
            <q-card class="border-card" flat>
                <apexchart width="520" :options="typeGraphic" :series="[totalIncome, totalExpenses]"></apexchart>
            </q-card>
        </div>
        <q-card v-if="getTotalPerCategory.length" class="border-card" flat>
            <div>
                <apexchart width="520" :options="categoryGraphic" :series="categoryData.series"></apexchart>
            </div>
        </q-card>
        <q-card v-if="getTotalPerStatus.length" class="border-card" flat>
            <div>
                <apexchart width="520" :options="statusGraphic" :series="statusData.series"></apexchart>
            </div>
        </q-card>
    </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import { formatCurrency } from 'src/services/services'
import { mapGetters } from 'vuex'
import VueApexCharts from 'vue3-apexcharts'
import _, { cloneDeep } from 'lodash'

export default defineComponent({
    name: 'Graphics',
    components: {
        apexchart: VueApexCharts,
    },
    data() {
        return {
            configChart: {
                chart: {
                    width: 520,
                    type: 'pie',
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
            await this.$store.dispatch('getDataForCategoryChart')
            await this.$store.dispatch('getDataForStatusChart')
        },
    },

    computed: {
        ...mapGetters(['totalIncome', 'totalExpenses', 'currentType', 'getTotalPerCategory', 'getTotalPerStatus', 'allRegisters']),

        categoryGraphic(): object {
            let options = cloneDeep(this.configChart)
            options.title.text = 'Categoria'
            options.labels = [...this.categoryData.labels]
            return options
        },

        statusGraphic(): object {
            let options = cloneDeep(this.configChart)
            options.title.text = 'Status'
            options.labels = [...this.statusData.labels]
            return options
        },

        typeGraphic(): object {
            let options = cloneDeep(this.configChart)
            options.title.text = 'Tipo'
            options.labels = ['Receitas', 'Despesas']
            return options
        },

        categoryData(): any {
            const category = {
                labels: [] as string[],
                series: [] as number[],
            }
            this.getTotalPerCategory.forEach((item: any) => {
                category.labels.push(item?.category)
                category.series.push(item?.value)
            })
            return category
        },

        statusData(): any {
            const status = {
                labels: [] as string[],
                series: [] as number[],
            }
            this.getTotalPerStatus.forEach((item: any) => {
                status.labels.push(item?.status)
                status.series.push(item?.value)
            })
            return status
        },

        isEmpty(): boolean {
            return this.allRegisters.length === 0
        },
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
