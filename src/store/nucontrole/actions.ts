import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { ExampleStateInterface } from './state'
import { useQuasar, Loading, Notify, LocalStorage } from 'quasar'
import useApi from 'src/composables/UseApi'
import { useRouter } from 'vue-router'

const router = useRouter()
const { list } = useApi()

const actions: ActionTree<ExampleStateInterface, StateInterface> = {
    someAction(/* context */) {
        // your code
    },

    async getList(context): Promise<void> {
        try {
            let response = await list('registers')
            context.commit('SET_REGISTERS', response)
        } catch (error: any) {
            if (error.status === 403) {
                LocalStorage.remove('authUser')
                router.push('/login')
            }
        }
    },
}

export default actions
