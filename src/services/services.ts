import moment from 'moment'
export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value)
}

export const formatDate = (value: string) => {
    return moment(value).locale('pt-br').format('L LTS')
}