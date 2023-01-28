import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { ExampleStateInterface } from './state'
import { Notify } from 'quasar'
import useApi from 'src/composables/UseApi'
import { Period } from 'src/models'
import { redirectWhenExpires } from 'src/services/services'

const { list, getByCategory, getByStatus } = useApi()
const actions: ActionTree<ExampleStateInterface, StateInterface> = {
    someAction(/* context */) {
        // your code
    },

    async getList(context, period: Period | null): Promise<void> {
        try {
            let response = await list('registers', period)
            context.commit('SET_REGISTERS', response)
            context.commit('SET_PERIOD', period)
        } catch (error: any) {
            if (error.message === 'JWT expired') {
                redirectWhenExpires()
            } else {
                Notify.create({
                    message: error.message,
                    type: 'negative',
                    position: 'top'
                })
            }
        }
    },

    async getDataForCategoryChart(context): Promise<void> {
        try {
            let response = await getByCategory(context.getters.currentType, context.getters.currentPeriod)
            context.commit('SET_TOTAL_PER_CATEGORY', response)
        } catch (error: any) {
            Notify.create({
                message: error?.message,
                type: 'negative',
                position: 'top'
            })
        }
    },

    async getDataForStatusChart(context): Promise<void> {
        try {
            let response = await getByStatus(context.getters.currentType, context.getters.currentPeriod)
            context.commit('SET_TOTAL_PER_STATUS', response)
        } catch (error: any) {
            Notify.create({
                message: error.message,
                type: 'negative',
                position: 'top'
            })
        }
    }
}

export default actions
