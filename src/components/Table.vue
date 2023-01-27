<template>
    <div>
        <q-table
            bordered
            class="table-header-class"
            table-header-class="text-white"
            style="border-radius: 8px"
            title-class="text-white"
            flat
            :no-data-label="notFoundDataText"
            :columns="columns"
            :visible-columns="$q.screen.lt.sm ? columnsMobile : columnsDesktop"
            :rows="rows"
            :rows-per-page-options="[15, 25, 50, 100]"
        >
            <!-- <template v-slot:body-cell-number="props">
                <q-td class="text-weight-regular" :key="props.row.id" :props="props">
                    {{ props.rowIndex + 1 }}
                </q-td>
            </template> -->
            <template v-slot:body-cell-value="props">
                <q-td :key="props.row.id" :props="props">
                    <div class="q-gutter-x-sm">
                        <q-icon size="xs" :name="setValueIcon(props.row.type)" />
                        <span :class="valueTextColor(props.row.type)">
                            {{ formatCurrency(props.row.value) }}
                        </span>
                    </div>
                </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
                <q-td>
                    <div class="text-center">
                        <q-btn @click="showDialogEdit(props.row)" icon="edit" color="secondary" :disable="!props.row" round flat dense>
                            <q-tooltip class="text-subtitle2">Editar registro</q-tooltip>
                        </q-btn>
                        <q-btn @click="showDialogDelete(props.row.id)" icon="delete" color="red-10" :disable="!props.row" round flat dense>
                            <q-tooltip class="text-subtitle2">Excluir registro</q-tooltip>
                        </q-btn>
                    </div>
                </q-td>
            </template>
        </q-table>
    </div>
    <q-dialog :maximized="$q.platform.is.desktop ? false : true" v-model="dialogEdit" persistent>
        <NewTransactionDialog @onClose="onClose" :editRegister="editRegister" :isEdit="true" title="Editar registro" @closeDialogEdit="closeDialogEdit()" />
    </q-dialog>
    <q-dialog v-model="dialogDelete">
        <DeleteDialog :id="deleteRegisterId" @onClose="onClose" />
    </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formatCurrency, formatDate } from 'src/services/services'
import { Column } from 'src/models'
import DeleteDialog from 'src/components/DeleteDialog.vue'
import NewTransactionDialog from 'src/components/NewTransactionDialog.vue'

export default defineComponent({
    components: {
        DeleteDialog,
        NewTransactionDialog,
    },
    props: {
        rows: {
            type: Array,
            required: true,
        },
    },
    name: 'Table',
    data() {
        const columns = [
            // {
            //     name: 'number',
            //     required: true,
            //     label: '#',
            //     sortable: true,
            //     align: 'left',
            // },
            {
                name: 'description',
                label: 'Descrição',
                field: 'description',
                align: 'left',
                classes: 'text-weight-regular main-color',
            },
            {
                name: 'value',
                label: 'Valor',
                field: 'value',
                sortable: true,
                align: 'left',
            },
            // {
            //     name: 'type',
            //     required: true,
            //     label: 'Tipo',
            //     field: 'type',
            //     align: 'left',
            //     sortable: true,
            //     classes: 'text-weight-regular main-color',
            // },
            {
                name: 'category',
                label: 'Categoria',
                field: 'category',
                sortable: true,
                align: 'left',
                classes: 'text-weight-regular main-color',
            },
            {
                name: 'status',
                label: 'Status',
                field: 'status',
                sortable: true,
                align: 'left',
                classes: 'text-weight-regular main-color',
            },
            // {
            //     name: 'date',
            //     required: true,
            //     label: 'Data de criação',
            //     field: 'created_at',
            //     sortable: true,
            //     align: 'left',
            //     format: (val: string) => formatDate(val),
            //     classes: 'text-weight-regular main-color',
            // },
            {
                name: 'actions',
                label: 'Ações',
                field: 'actions',
                align: 'center',
            },
        ] as Column[]
        return {
            columns,
            columnsMobile: ['description', 'value', 'actions'] as string[],
            columnsDesktop: ['description', 'value', 'category', 'status', 'actions'] as string[],
            dialogDelete: false,
            deleteRegisterId: 0,
            dialogEdit: false,
            editRegister: {},
            notFoundDataText: 'Nenhum registro encontrado para o período selecionado',
        }
    },

    methods: {
        formatCurrency,

        setValueIcon(val: string) {
            return val === 'Receita' ? 'arrow_upward' : 'arrow_downward'
        },
        valueTextColor(val: string) {
            return val === 'Receita' ? 'text-weight-medium text-primary' : 'text-weight-medium text-negative'
        },

        showDialogDelete(id: number) {
            this.dialogDelete = true
            this.deleteRegisterId = id
        },

        showDialogEdit(val: any) {
            this.dialogEdit = true
            this.editRegister = val
        },

        onClose(): void {
            this.dialogDelete = false
            this.dialogEdit = false
        },
    },
})
</script>

<style lang="scss">
.table-header-class {
    max-height: 600px;

    .q-table__top,
    thead tr:first-child th {
        background-color: $primary;
    }

    thead tr th {
        position: sticky;
        z-index: 1;
    }
    thead tr:first-child th {
        top: 0;
    }
    &.q-table--loading thead tr:last-child th {
        top: 48px;
    }
}
</style>