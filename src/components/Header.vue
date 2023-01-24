<template>
    <header>
        <div class="flex justify-between items-center q-pt-lg">
            <!-- <q-img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" alt="Quasar Logo" width="5%" fit="contain" /> -->
            <div class="flex column">
                <div v-if="$q.screen.lt.sm" style="top: 27px; right: 27px" class="absolute-top-right">
                    <q-btn @click="isShowValues = !isShowValues" :icon="isShowValues ? 'visibility' : 'visibility_off'" color="white" round flat />
                </div>
                <span class="text-h4 text-white text-weight-medium">Nucontrole</span>
                <span v-if="$q.screen.lt.sm" class="text-subtitle1 text-white"
                    >Olá, <b>{{ userName }}!</b></span
                >
            </div>
            <div>
                <span v-if="$q.screen.gt.xs" class="text-subtitle1 text-white"
                    >Olá, <b>{{ userName }}!</b></span
                >
                <q-btn v-show="$q.screen.gt.xs" @click="handleLogout" color="white" flat icon="logout" round text-color="white" size="lg">
                    <q-tooltip class="text-subtitle2">Sair</q-tooltip>
                </q-btn>
            </div>
        </div>
        <div class="flex justify-between items-center">
            <div class="text-subtitle1 text-white">
                <span>Período atual: </span>
                <span class="text-h6 text-weight-bold">{{ showPeriod }}</span>
            </div>
        </div>
        <div class="row q-col-gutter-lg">
            <div class="col-xs-12 col-md-4 col-lg-4">
                <Card :value="totalIncome" :isShowValues="isShowValues" title="Receitas" colorIcon="secondary" icon="fa-solid fa-circle-arrow-up" />
            </div>
            <div class="col-xs-12 col-md-4 col-lg-4">
                <Card title="Despesas" :value="totalExpenses" :isShowValues="isShowValues" colorIcon="red-10" icon="fa-solid fa-circle-arrow-down" />
            </div>
            <div class="col-xs-12 col-md-4 col-lg-4">
                <Card title="Saldo" :value="totalBalance" :isShowValues="isShowValues" colorIcon="positive" icon="fa-solid fa-sack-dollar" />
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from 'components/Card.vue'
import { mapGetters } from 'vuex'
import useAuthUser from 'src/composables/UseAuthUser'

export default defineComponent({
    name: 'Header',
    components: {
        Card,
    },
    data() {
        const { logout } = useAuthUser()
        return {
            logout,
            isShowValues: this.$q.screen.gt.xs ? true : false,
        }
    },

    computed: {
        ...mapGetters(['totalIncome', 'totalExpenses', 'totalBalance', 'currentPeriod']),

        userName(): string | object | null {
            return this.$q.localStorage.getItem('userName')
        },

        showPeriod(): string {
            if (this.currentPeriod?.month && this.currentPeriod?.year) return `${this.currentPeriod.month}/${this.currentPeriod.year}`
            else return 'Todos os registros'
        },
    },

    methods: {
        async handleLogout() {
            await this.logout()
            this.$router.push('/login')
        },
    },
})
</script>

<style lang="scss" scoped>
header {
    background-color: $secondary;
    padding: 1rem 8rem;

    @media (max-width: 1080px) {
        padding: 1rem 8rem;
    }
    @media (max-width: 720px) {
        padding: 0.5rem 2rem;
    }
}
</style>