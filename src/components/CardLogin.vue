<template>
    <div>
        <q-card class="card-login">
            <q-form @submit.prevent="onSubmit">
                <div class="row q-pa-lg q-col-gutter-sm">
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <div class="q-mb-md text-h5 text-center text-weight-regular main-color"></div>
                    </div>
                    <div v-if="isNewUser" class="col-xs-12 col-md-12 col-lg-12">
                        <q-input v-model="user.options.data.name" lazy-rules label="Nome*" no-error-icon outlined clear-icon="close" :rules="[(val) => !!val || 'Campo obrigatório']" />
                    </div>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <q-input
                            autofocus
                            v-model="user.email"
                            lazy-rules
                            label="Email*"
                            no-error-icon
                            outlined
                            clear-icon="close"
                            :rules="[(val) => !!val || 'Campo obrigatório', isValidEmail]"
                        />
                    </div>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <q-input
                            v-model="user.password"
                            lazy-rules
                            label="Senha*"
                            no-error-icon
                            :type="isPwd ? 'text' : 'password'"
                            outlined
                            clear-icon="close"
                            :rules="[(val) => !!val || 'Campo obrigatório', isValidPassword]"
                        >
                            <template v-slot:append>
                                <span @click="isPwd = !isPwd" class="cursor-pointer text-subtitle2 text-primary">{{ isPwd ? 'Ocultar' : 'Mostrar' }}</span>
                            </template>
                        </q-input>
                    </div>
                    <div v-if="isNewUser" class="col-xs-12 col-md-12 col-lg-12">
                        <q-input
                            v-model="passwordConfirm"
                            lazy-rules
                            label="Confirme a senha*"
                            no-error-icon
                            :type="isPwdConfirm ? 'text' : 'password'"
                            outlined
                            clear-icon="close"
                            :rules="[(val) => !!val || 'Campo obrigatório', isSamePassword]"
                        >
                            <template v-slot:append>
                                <span @click="isPwdConfirm = !isPwdConfirm" class="cursor-pointer text-subtitle2 text-primary">{{ isPwdConfirm ? 'Ocultar' : 'Mostrar' }}</span>
                            </template>
                        </q-input>
                    </div>
                    <div v-if="!isNewUser" class="col-xs-12 col-md-12 col-lg-12">
                        <q-btn class="full-width q-pa-sm text-h6" no-caps text-color="white" :disable="disableBtn" unelevated color="primary" label="Entrar" type="submit" />
                    </div>
                    <div v-else class="col-xs-12 col-md-12 col-lg-12">
                        <q-btn class="full-width q-pa-sm text-h6" no-caps text-color="white" unelevated color="secondary" label="Cadastrar" type="submit" />
                    </div>
                    <div v-if="!isNewUser" class="col-xs-12 col-md-12 col-lg-12 q-my-md text-center main-color">
                        <span>Não tem uma conta ?</span>
                        <span @click="isNewUser = true" style="text-decoration: none" class="text-primary text-weight-medium cursor-pointer"> Cadastre-se!</span>
                    </div>
                    <div v-else class="col-xs-12 col-md-12 col-lg-12 q-my-md text-center main-color">
                        <span>Tem uma conta ?</span>
                        <span @click="isNewUser = false" style="text-decoration: none" class="text-primary text-weight-medium cursor-pointer"> Faça login!</span>
                    </div>

                    <div class="row items-center justify-center col-xs-12 col-md-12 col-lg-12 q-my-md">
                        <div class="col-xs-5 col-md-5">
                            <q-separator />
                        </div>
                        <span class="q-mx-md main-color">ou</span>
                        <div class="col-xs-5 col-md-5">
                            <q-separator />
                        </div>
                    </div>
                </div>
            </q-form>
        </q-card>
        <q-dialog v-model="showDialogInfo">
            <DialogNewUserConfirmation />
        </q-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { LoginUser } from 'src/models'
import useAuthUser from 'src/composables/UseAuthUser'
import DialogNewUserConfirmation from 'src/components/DialogNewUserConfirmation.vue'
export default defineComponent({
    name: 'CardLogin',
    components: {
        DialogNewUserConfirmation,
    },
    data() {
        const { login, register } = useAuthUser()
        return {
            login,
            register,
            isNewUser: false,
            user: {
                email: '',
                password: '',
                options: {
                    data: {
                        name: '',
                    },
                },
            },
            isPwd: false,
            isPwdConfirm: false,
            passwordConfirm: '',
            showDialogInfo: false,
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
            let login = await this.login(this.user)
            if (login) this.$router.push('/')
        },

        async handleRegister() {
            await this.register(this.user)
            this.isNewUser = false
            this.showDialogInfo = true
            this.resetFields()
        },

        onSubmit() {
            if (this.isNewUser) {
                this.handleRegister()
            } else {
                this.handleLogin()
            }
        },
        isValidEmail(val: string) {
            const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
            return emailPattern.test(val) || 'Email Inválido!'
        },
        isValidPassword(val: string) {
            return val.length > 5 || 'Senha inválida!'
        },
        isSamePassword(val: string) {
            return val === this.user.password || 'Senhas não conferem!'
        },

        resetFields() {
            this.user.options.data.name = ''
            this.user.password = ''
            this.isPwdConfirm = false
            this.passwordConfirm = ''
        },
    },
})
</script>

<style lang="scss" scoped>
.card-login {
    border: 2px solid #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 8px rgb(98 115 132 / 4%), 0 0 4px rgb(98 115 132 / 12%);
    max-width: 400px;
}
</style>
