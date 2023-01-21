import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { ExampleStateInterface } from './state'
import { LocalStorage, Notify } from 'quasar'
import useApi from 'src/composables/UseApi'
import { useRouter } from 'vue-router'

const router = useRouter()
const { list, getByCategory, getByStatus } = useApi()
import { Period } from 'src/models'

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
            if (error.status === 403) {
                LocalStorage.remove('authUser')
                router.push('/login')
            } else {
                Notify.create({
                    message: error.message,
                    type: 'negative',
                    position: 'top'
                })
            }
        }
    },

    async getDataForCategoryChart(context): Promise<Array<object> | null> {
        let response = await getByCategory(context.getters.currentType)
        return response
    },

    async getDataForStatusChart(context): Promise<Array<object> | null> {
        let response = await getByStatus(context.getters.currentType)
        return response
    }
}

export default actions
