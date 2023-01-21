import { date, LocalStorage, Notify } from 'quasar'
import { MonthOptions, Period } from 'src/models/models'
import { Base64 } from 'js-base64';

export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value)
}

export const formatDate = (value: string): string => {
    return date.formatDate(value, 'DD/MM/YYYY')
}

export const localeDate = {
        days: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
        daysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
} 

export const monthOptions = [
    { label: 'Janeiro', value: 'Jan' },
    { label: 'Fevereiro', value: 'Fev' },
    { label: 'Março', value: 'Mar' },
    { label: 'Abril', value: 'Abr' },
    { label: 'Maio', value: 'Mai' },
    { label: 'Junho', value: 'Jun' },
    { label: 'Julho', value: 'Jul' },
    { label: 'Agosto', value: 'Ago' },
    { label: 'Setembro', value: 'Set' },
    { label: 'Outubro', value: 'Out' },
    { label: 'Novembro', value: 'Nov' },
    { label: 'Dezembro', value: 'Dez' },
] as Array<MonthOptions>

export const yearOptions: Array<number> = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]

export const currentDate = (): Period => {
    let month = Date.now()
    let year = Date.now()
    return {
        month: date.formatDate(month, 'MMM', localeDate),
        year: Number(date.formatDate(year, 'YYYY', localeDate)),
    }
}

export const exportCsv = (registers: Array<object>, incomes: number, expenses: number, balance: number): void => {
    try {
        let formatedRows = registers.map((row: any, index: number) => {
            return {
                '#': index + 1,
                Descrição: row.description,
                Valor: formatCurrency(row.value),
                Categoria: row.category,
                Tipo: row.type,
                Status: row.status,
                Mês: row.month,
                Ano: row.year,
            }
        })
        let csv: string = ''
        let header = Object.keys(formatedRows[0]).join(';')
        csv += header + '\n'
        let content = Object.values(formatedRows.map((row: any) => Object.values(row).join(';'))).join('\n')
        csv += content + '\n \n'
        csv += 'Total de Receitas' + ';' + formatCurrency(incomes) + '\n'
        csv += 'Total de Despesas' + ';' + formatCurrency(expenses) + '\n'
        csv += 'Saldo' + ';' + formatCurrency(balance) + '\n'
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a')
        link.setAttribute('href', url)
        link.setAttribute('download', 'registros.csv')
        document.body.appendChild(link)
        link.click()
        return
    } catch (error: any) {
            Notify.create({
                message: 'Erro ao exportar CSV',
                color: 'negative',
                position: 'top'
            })
    }
}

export const convertAccessToken = (token: string): void => {
    try {
        token = token.split('#access_token=')[1].split('.')[1]
        let decodeToken = JSON.parse(Base64.decode(token))
        LocalStorage.set('authUser', decodeToken.sub)
        LocalStorage.set('userName', decodeToken.user_metadata.full_name)  
    } catch (error: any) {
        Notify.create({
            message: 'Token inválido',
            type: 'negative',
            position: 'top'
        })
    }
    return 
}