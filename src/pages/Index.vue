<template>
    <q-page padding class="wrapper">
        <div class="q-pt-lg">
            <Table :rows="allRegisters" />
        </div>
        <div class="q-pt-lg">
            <Graphics />
        </div>
    </q-page>
</template>

<script >
import { defineComponent, ref } from 'vue'
import Card from 'components/Card.vue'
import Table from 'components/Table.vue'
import Graphics from 'components/Graphics.vue'
import { mapGetters } from 'vuex'

export default defineComponent({
    name: 'PageIndex',
    components: { Card, Table, Graphics },
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
        }
    },

    computed: {
        ...mapGetters(['allRegisters']),
    },

    methods: {},

    async created() {
        await this.$store.dispatch('getList')
    },
})
</script>
<style lang="scss" scoped>
</style>
