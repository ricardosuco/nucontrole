<template>
    <q-intersection transition="fade" transition-duration="500">
        <q-card class="card-login">
            <q-form ref="signup" @submit.prevent="onSubmit">
                <div class="row q-pa-lg q-col-gutter-sm">
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <q-input autofocus v-model="user.options.data.name" lazy-rules label="Nome*" no-error-icon outlined clear-icon="close" :rules="[(val) => !!val || 'Campo obrigatório']" />
                    </div>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <q-input v-model="user.email" lazy-rules label="Email*" no-error-icon outlined clear-icon="close" :rules="[(val) => !!val || 'Campo obrigatório', isValidEmail]" />
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

                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <q-btn class="full-width q-pa-sm text-h6" no-caps text-color="white" unelevated color="secondary" label="Cadastrar" type="submit" />
                    </div>

                    <div class="col-xs-12 col-md-12 col-lg-12 q-my-md text-center main-color">
                        <span>Tem uma conta ?</span>
                        <span @click="$emit('switchCard', 'CardLogin')" style="text-decoration: none" class="text-primary text-weight-medium cursor-pointer"> Faça login!</span>
                    </div>
                </div>
            </q-form>
        </q-card>
    </q-intersection>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
export default defineComponent({
    name: 'CardSignUp',
    components: {},
    data() {
        const { login, register, sendPasswordResetEmail } = useAuthUser()
        return {
            register,
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
            dialogText: '',
            passwordConfirm: '',
        }
    },

    computed: {
        disableBtn() {
            if (!!this.user.password && !!this.user.email) return false
            else return true
        },
    },

    methods: {
        async handleRegister() {
            try {
                await this.register(this.user)
                this.dialogText = 'Para finalizar o cadastro verifique a mensagem de confirmação enviada para o seu endereço de email'
                this.resetFields()
                this.$emit('showDialogInfo', this.dialogText)
            } catch (error: any) {
                this.$q.notify({
                    message: error.toString(),
                    type: 'negative',
                    position: 'top',
                })
            }
        },

        onSubmit() {
            this.handleRegister()
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
            this.user.email = ''
        },
    },
})
</script>

<style lang="scss" scoped>
</style>
