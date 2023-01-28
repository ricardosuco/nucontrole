import useSupabase from 'src/boot/supabase'
import { Period, CopyRegistersArgs } from 'src/models'
import useAuthUser from 'src/composables/UseAuthUser'


export default function useApi() {
    const { supabase } = useSupabase()
    const { authUser } = useAuthUser()

    const list = async (table: string, period: Period | null) => {
        if (period) {
            const { month, year } = period
            const { data, error } = await supabase.from(table).select('*').eq('user_id', authUser.value.id).eq('month', month).eq('year', year)
            if (error) throw error
            return data
        }
        const { data, error } = await supabase.from(table).select('*').eq('user_id', authUser.value.id)
        if (error) throw error
        return data
    }

    const getById = async (table: string, id: string) => {
        const { data, error } = await supabase.from(table).select('*').eq('id', id).single()
        if (error) throw error
        return data[0]
    }

    const getByCategory = async (type: string, period: Period | null) => {
        if (period) {
            const { month, year } = period
            const { data, error } = await supabase.rpc('filter_category_with_period', { type_input: type, month_input: month, year_input: year })
            if (error) throw error
            return data
        }
        const { data, error } = await supabase.rpc('filter_category', { type_input: type })
        if (error) throw error
        return data
    }

    const getByStatus = async (type: string, period: Period | null) => {
        if (period) {
            const { month, year } = period
            const { data, error } = await supabase.rpc('filter_status_with_period', { type_input: type, month_input: month, year_input: year })
            if (error) throw error
            return data
        }
        const { data, error } = await supabase.rpc('filter_status', { type_input: type })
        if (error) throw error
        return data
    }

    const copyRegistersByPeriod = async (copyRegistersArgs: CopyRegistersArgs) => {
        const { data, error } = await supabase.rpc('copy_registers_by_period', {...copyRegistersArgs, user_id_input: authUser.value.id } )
        if (error) throw error
        return data
    }

    const create = async (table: string, body: any) => {
        const { data, error } = await supabase.from(table).insert({
            ...body,
            user_id: authUser.value.id,
        })
        if (error) throw error
    }

    const update = async (table: string, id: number, body: any) => {
        const { data, error } = await supabase.from(table).update(body).eq('id', id)
        if (error) throw error
    }

    const remove = async (table: string, id: number) => {
        const { data, error } = await supabase.from(table).delete().eq('id', id)
        if (error) throw error
    }

    return {
        list,
        getById,
        getByCategory,
        getByStatus,
        create,
        update,
        remove,
        copyRegistersByPeriod,
    }
}
