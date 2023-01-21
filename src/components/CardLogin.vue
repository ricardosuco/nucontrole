<template>
    <q-intersection transition="fade" transition-duration="500">
        <q-card class="card-login">
            <q-form @submit.prevent="onSubmit">
                <div class="row q-pa-lg q-col-gutter-sm">
                    <div class="col-xs-12 col-md-12 col-lg-12 q-mb-md">
                        <q-input autofocus v-model="user.email" label="Email*" no-error-icon outlined clear-icon="close" />
                    </div>

                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <q-input v-model="user.password" lazy-rules label="Senha*" no-error-icon :type="isPwd ? 'text' : 'password'" outlined clear-icon="close">
                            <template v-slot:append>
                                <span @click="isPwd = !isPwd" class="cursor-pointer text-subtitle2 text-primary">{{ isPwd ? 'Ocultar' : 'Mostrar' }}</span>
                            </template>
                        </q-input>
                        <div class="flex justify-end q-my-xs">
                            <span @click="$emit('switchCard', 'CardResetPassword')" class="text-primary cursor-pointer">Esqueceu a senha ?</span>
                        </div>
                    </div>

                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <q-btn class="full-width q-pa-sm text-h6 rounded-borders" no-caps text-color="white" :disable="disableBtn" unelevated color="primary" label="Entrar" type="submit" />
                    </div>

                    <div class="col-xs-12 col-md-12 col-lg-12 q-my-md text-center main-color">
                        <span>Não tem uma conta ?</span>
                        <span @click="$emit('switchCard', 'CardSignUp')" style="text-decoration: none" class="text-primary text-weight-medium cursor-pointer"> Cadastre-se!</span>
                    </div>

                    <div class="row items-center justify-center col-xs-12 col-md-12 col-lg-12">
                        <div class="col-xs-4 col-sm-5 col-md-5">
                            <q-separator />
                        </div>
                        <span class="q-mx-md main-color text-subtitle1">ou</span>
                        <div class="col-xs-4 col-sm-5 col-md-5">
                            <q-separator />
                        </div>
                        <div class="col-xs-12 col-md-12 col-lg-12 q-mt-md">
                            <q-btn class="full-width" @click="loginWithProvider('google')" color="primary" icon="img:images/google.svg" no-caps label="Entrar com Google" unelevated outline size="lg"/>
                        </div>
                        <!-- <div class="col-xs-12 col-md-12 col-lg-12 q-mt-md">
                            <q-btn class="full-width" @click="loginWithProvider('facebook')" text-color="#363F5F" icon="img:images/facebook.svg" no-caps label="Entrar com Facebook" unelevated size="lg"/>
                        </div> -->
                    </div>
                </div>
            </q-form>
        </q-card>
    </q-intersection>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { LoginUser } from 'src/models'
import useAuthUser from 'src/composables/UseAuthUser'
export default defineComponent({
    name: 'CardLogin',
    components: {},
    data() {
        const { login, loginWithSocialProvider } = useAuthUser()
        return {
            login,
            loginWithSocialProvider,
            user: {
                email: '',
                password: '',
            },
            isPwd: false,
        }
    },

    computed: {
        disableBtn() {
            if (!!this.user.password && !!this.user.email) return false
            else return true
        },
    },

    methods: {
        async handleLogin() {
            try {
                await this.login(this.user)
                this.$router.push('/')
            } catch (error: any) {
                if (error.status === 400 || error.status === 403) {
                    this.$q.notify({
                        message: 'Usuário ou senha inválidos!',
                        type: 'negative',
                        position: 'top',
                    })
                } else {
                    this.$q.notify({
                        message: 'Ocorreu um erro inesperado.',
                        type: 'negative',
                        position: 'top',
                    })
                }
            }
        },

        async loginWithProvider(provider: string) {
            try {
                await this.loginWithSocialProvider(provider)
            } catch(error: any) {
                console.log(error)
            }
        },

        onSubmit() {
            this.handleLogin()
        },
    },
})
</script>

<style lang="scss" scoped>
</style>
