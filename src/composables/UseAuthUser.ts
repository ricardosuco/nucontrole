import useSupabase from 'boot/supabase'
import { date, LocalStorage, Loading, Notify } from 'quasar'
import { LoginUser } from 'src/models'
import { localeDate } from 'src/services/services'
import { ref } from 'vue'

const authUser: object | null | any = ref(null)

export default function useAuthUser() {
    const { supabase } = useSupabase()

    const login = async (loginUser: LoginUser): Promise<void> => {
            Loading.show()
            const { data, error } = await supabase.auth.signInWithPassword(loginUser)
            Loading.hide()
            if (error) throw error
            LocalStorage.set('period', {
                month: date.formatDate(Date.now(), 'MMM', localeDate),
                year: date.formatDate(Date.now(), 'YYYY', localeDate)
            })    
    }

    const loginWithSocialProvider = async (provider: any): Promise<void> => {
        const { data, error } = await supabase.auth.signInWithOAuth({provider: provider})
        if (error) throw error
        LocalStorage.set('period', {
            month: date.formatDate(Date.now(), 'MMM', localeDate),
            year: date.formatDate(Date.now(), 'YYYY', localeDate)
        })
    };

    const logout = async (): Promise<void> => {
        Loading.show()
        const { error } = await supabase.auth.signOut()
        Loading.hide()
        if (error) throw error
        LocalStorage.remove('period')
    }

    const isLoggedIn = () => {
        return !!authUser.value
    }

    const register = async (loginUser: LoginUser, ...meta: any[]): Promise<void> => {
            Loading.show()
            const { data, error } = await supabase.auth.signUp(loginUser)
            Loading.hide()
            if (error) throw error
            if (!data.user?.identities?.length) throw new Error('Já existe um cadastro vinculado a este email') 
    }

    const updateUser = async (new_password: string): Promise<void> => {
        const { data, error } = await supabase.auth.updateUser({
            password: new_password
          })
          if (error) throw error
    }

    const sendPasswordResetEmail = async (email: string): Promise<void> => {
        const {data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/login?recovery=true`,
          })
        if (error) throw error
    }

    const retriveUser = async (): Promise<void> => {
        try {
            const { data: { user }, error } = await supabase.auth.getUser()
            if (error) throw error
            authUser.value = {...user}
        } catch (error: any) {
            Notify.create({
                message: 'Token inválido',
                type: 'negative',
                position: 'top'
            })
        }
        return 
    }

    return {
        authUser,
        login,
        loginWithSocialProvider,
        logout,
        isLoggedIn,
        register,
        updateUser,
        sendPasswordResetEmail,
        retriveUser,
    }
}
