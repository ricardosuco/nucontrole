<template>
    <q-intersection transition="fade" transition-duration="500">
        <q-card class="card-login">
            <q-form @submit.prevent="handlePwdRecovery">
                <div class="row q-pa-lg q-col-gutter-sm">
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <div class="q-mb-md text-h6 text-center text-weight-regular main-color">Digite sua nova senha</div>
                    </div>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <q-input
                            v-model="password"
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
                        <q-btn class="full-width q-pa-sm text-h6" no-caps text-color="white" :disable="disableBtn" unelevated color="secondary" label="Enviar" type="submit" />
                    </div>

                    <div class="col-xs-12 col-md-12 col-lg-12 q-my-md text-center main-color">
                        <span @click="$emit('goToLogin')" style="text-decoration: none" class="text-primary text-weight-medium cursor-pointer">Login</span>
                    </div>
                </div>
            </q-form>
        </q-card>
    </q-intersection>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import DialogConfirmation from 'src/components/DialogConfirmation.vue'
export default defineComponent({
    name: 'CardResetPassword',
    components: {
        DialogConfirmation,
    },
    data() {
        const { updateUser } = useAuthUser()
        return {
            updateUser,
            password: '',
            passwordConfirm: '',
            isPwdConfirm: false,
            isPwd: false,
            dialogText: 'Verifique seu email e clique no link de redefiniçaõ de senha!',
        }
    },

    computed: {
        disableBtn() {
            if (!!this.password || !!this.passwordConfirm) return false
            else return true
        },
    },

    methods: {
        async handlePwdRecovery() {
            try {
                this.$q.loading.show()
                await this.updateUser(this.password)
                this.$emit('goToLogin')
                this.$q.notify({
                    message: 'A sua senha foi alterada!',
                    type: 'positive',
                    position: 'top',
                })
            } catch (error: any) {
                this.$q.notify({
                    message: error.message,
                    type: 'negative',
                    position: 'top',
                })
            }
            this.$q.loading.hide()
        },

        isValidPassword(val: string) {
            return val.length > 5 || 'Senha inválida!'
        },
        isSamePassword(val: string) {
            return val === this.password || 'Senhas não conferem!'
        },
    },
})
</script>

<style lang="scss" scoped>
</style>
