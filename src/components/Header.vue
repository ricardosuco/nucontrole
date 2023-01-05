<template>
    <header>
        <div class="flex justify-between items-center">
            <!-- <q-img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" alt="Quasar Logo" width="5%" fit="contain" /> -->
            <span class="text-h4 text-white text-weight-medium">Nucontrole</span>
            <div>
                <q-btn @click="handleLogout" color="white" flat icon="logout" round text-color="white" size="lg">
                    <q-tooltip class="text-subtitle2">Sair</q-tooltip>
                </q-btn>
            </div>
        </div>
        <div class="row q-col-gutter-lg">
            <div class="col-xs-12 col-md-4 col-lg-4">
                <Card class="margin-" :value="totalIncome" title="Receitas" icon="fa-solid fa-circle-arrow-up" />
            </div>
            <div class="col-xs-12 col-md-4 col-lg-4">
                <Card title="Despesas" :value="totalExpenses" icon="fa-solid fa-circle-arrow-down" />
            </div>
            <div class="col-xs-12 col-md-4 col-lg-4">
                <Card title="Saldo" :value="totalBalance" icon="fa-solid fa-sack-dollar" />
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
        }
    },

    computed: {
        ...mapGetters(['totalIncome', 'totalExpenses', 'totalBalance']),

        
    },

    methods: {
        async handleLogout() {
            await this.logout()
            this.$router.push('/login')
        },
    }
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