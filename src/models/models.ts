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