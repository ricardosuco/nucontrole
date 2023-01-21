export interface LoginUser {
    email: string;
    password: string;
}

export interface Column {
    name: string
    required: boolean
    label: string
    field?: string
    sortable?: boolean
    align?: string
    format?: (val: any) => string
}

export interface Period {
    month: string | null,
    year: number | null
}

export interface MonthOptions {
    label: string,
    value: string
}

export interface CopyRegistersArgs {
    month_copy_input?: string,
    year_copy_input?: number,
    new_month_input?: string,
    new_year_input?: number,
}