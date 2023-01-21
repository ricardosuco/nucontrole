<template>
    <div class="main-card q-pt-xl">
        <q-card bordered class="border-card q-pa-lg" flat>
            <div class="flex justify-between items-center q-pb-md">
                <span class="main-color text-subtitle1">{{ title }}</span>
                <q-icon size="sm" :color="colorIcon" :name="icon" />
            </div>
            <div v-if="isShowValues">
                <h5 class="text-primary">{{ formatCurrency(value) }}</h5>
            </div>
            <div v-else>
                <q-skeleton width="180px" type="rect" animation="none"/>
            </div>
        </q-card>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { formatCurrency } from 'src/services/services'
export default defineComponent({
    name: 'Card',
    props: {
        title: {
            type: String,
        },
        icon: {
            type: String,
        },
        value: {
            type: Number,
            default: 0,
        },
        colorIcon: {
            type: String,
            default: 'secondary',
        },
        isShowValues: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {}
    },

    methods: {
        formatCurrency,
    },
})
</script>

<style lang="scss" scoped>
.main-card {
    min-width: 320px;
    margin-bottom: -3rem;
}
.border-card {
    border: 2px solid #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 8px rgb(98 115 132 / 4%), 0 0 4px rgb(98 115 132 / 12%);
}
</style>