import useSupabase from 'boot/supabase'
import { date, LocalStorage, Loading } from 'quasar'
import { LoginUser } from 'src/models'
import { localeDate } from 'src/services/services'

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
            LocalStorage.set('authUser', data?.user?.id)
            LocalStorage.set('userName', data?.user?.user_metadata.name)          
    }

    const loginWithSocialProvider = async (provider: any) => {
        const { data, error } = await supabase.auth.signInWithOAuth({provider: provider})
        if (error) throw error
        console.log(data)
        // LocalStorage.set('period', {
        //     month: date.formatDate(Date.now(), 'MMM', localeDate),
        //     year: date.formatDate(Date.now(), 'YYYY', localeDate)
        // })
        // LocalStorage.set('authUser', data?.user?.id)
        // LocalStorage.set('userName', data?.user?.user_metadata.full_name) 
    };

    const logout = async () => {
        Loading.show()
        const { error } = await supabase.auth.signOut()
        Loading.hide()
        if (error) throw error
        LocalStorage.remove('period')
        LocalStorage.remove('authUser')
        LocalStorage.remove('userName')
    }

    // const isLoggedIn = () => {
    //     return !!user.value;
    // }

    const register = async (loginUser: LoginUser, ...meta: any[]) => {
            Loading.show()
            const { data, error } = await supabase.auth.signUp(loginUser)
            Loading.hide()
            if (error) throw error
            if (!data.user?.identities?.length) throw new Error('Já existe um cadastro vinculado a este email') 
    }

    const updateUser = async (new_password: string) => {
        const { data, error } = await supabase.auth.updateUser({
            password: new_password
          })
          if (error) throw error
    }

    const sendPasswordResetEmail = async (email: string) => {
        const {data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/login?recovery=true`,
          })
        if (error) throw error
    }

    return {
        login,
        loginWithSocialProvider,
        logout,
        register,
        updateUser,
        sendPasswordResetEmail,
    }
}
