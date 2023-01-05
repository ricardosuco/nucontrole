import useSupabase from 'src/boot/supabase'
import { Notify, LocalStorage, Loading } from 'quasar'


export default function useApi() {
    const { supabase } = useSupabase()

    const list = async (table: string) => {
        const { data, error } = await supabase.from(table).select('*').eq('user_id', LocalStorage.getItem('authUser'))
        if (error) throw error
        return data
    }

    const getById = async (table: string, id: string) => {
        const { data, error } = await supabase.from(table).select('*').eq('id', id).single()
        if (error) throw error
        return data[0]
    }

    const getByCategory = async (type: string) => {
        const { data, error } = await supabase.rpc('filter_category', { type_input: type })
        if (error) throw error
        return data
    }

    const getByStatus = async (type: string) => {
        const { data, error } = await supabase.rpc('filter_status', { type_input: type })
        if (error) throw error
        return data
    }

    const create = async (table: string, body: any) => {
        Loading.show()
        const { data, error } = await supabase.from(table).insert({
            ...body,
            user_id: LocalStorage.getItem('authUser'),
        })
        Loading.hide()
        if (error) throw error
        Notify.create({
            message: 'Novo registro adicionado!',
            type: 'positive',
            position: 'top',
        })
        return data
    }

    const update = async (table: string, id: number, body: any) => {
        Loading.show()
        const { data, error } = await supabase.from(table).update(body).eq('id', id)
        Loading.hide()
        if (error) throw error
        return data
    }

    const remove = async (table: string, id: number) => {
        Loading.show()
        const { data, error } = await supabase.from(table).delete().eq('id', id)
        Loading.hide()
        if (error) throw error
        Notify.create({
            message: 'Registro removido!',
            type: 'positive',
            position: 'top',
        })
        return data
    }

    return {
        list,
        getById,
        getByCategory,
        getByStatus,
        create,
        update,
        remove,
    }
}
