import useSupabase from 'boot/supabase'
import { Notify, LocalStorage, Loading } from 'quasar'
import { LoginUser } from 'src/models'

export default function useAuthUser() {
    const { supabase } = useSupabase()

    const login = async (loginUser: LoginUser) => {
        try {
            Loading.show()
            const { data, error } = await supabase.auth.signInWithPassword(loginUser)
            Loading.hide()
            if (error) throw error
            LocalStorage.set('authUser', data?.user?.id)
            let sucess = true
            return sucess
        } catch (error: any) {
            console.log(error)
            if (error.status === 400 || error.status === 403) {
                Notify.create({
                    message: 'Usuário ou senha inválidos!',
                    type: 'negative',
                    position: 'top',
                })
            } else {
                Notify.create({
                    message: 'Ocorreu um erro inesperado...',
                    type: 'negative',
                    position: 'top',
                })
            }
        }
    }

    // const loginWithSocialProvider = async (provider: string) => {
    //     const { user, error } = await supabase.auth.signIn({provider})
    //     if (error) throw error
    // };

    const logout = async () => {
        Loading.show()
        const { error } = await supabase.auth.signOut()
        Loading.hide()
        if (error) throw error
        LocalStorage.remove('authUser')
    }

    // const isLoggedIn = () => {
    //     return !!user.value;
    // }

    const register = async (loginUser: LoginUser, ...meta: any[]) => {
        try {
            Loading.show()
            const { data, error } = await supabase.auth.signUp(loginUser)
            Loading.hide()
            if (error) throw error
            let sucess = true
            return sucess
        } catch (error: any) {
            if (error.status === 400 || error.status === 403) {
                Notify.create({
                    message: error.toString(),
                    type: 'negative',
                    position: 'top',
                })
            } else {
                Notify.create({
                    message: 'Ocorreu um erro inesperado...',
                    type: 'negative',
                    position: 'top',
                })
            }
        }
    }

    const update = async (data: any) => {}

    const sendPasswordResetEmail = async (email: string) => {}

    return {
        login,
        // loginWithSocialProvider,
        logout,
        register,
        update,
        sendPasswordResetEmail,
    }
}
