<template>
    <q-intersection transition="fade" transition-duration="500">
        <q-card class="card-login">
            <q-form @submit.prevent="handlePwdReset">
                <div class="row q-pa-lg q-col-gutter-sm">
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <div class="q-mb-md text-h6 text-center text-weight-regular main-color">Enviaremos um link para criar uma nova senha</div>
                    </div>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <q-input autofocus v-model="email" lazy-rules label="Email*" no-error-icon outlined clear-icon="close" :rules="[(val) => !!val || 'Campo obrigatório', isValidEmail]" />
                    </div>

                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <q-btn class="full-width q-pa-sm text-h6" no-caps text-color="white" :disable="disableBtn" unelevated color="secondary" label="Enviar" type="submit" />
                    </div>

                    <div class="col-xs-12 col-md-12 col-lg-12 q-my-md text-center main-color">
                        <span @click="$emit('switchCard', 'CardLogin')" style="text-decoration: none" class="text-primary text-weight-medium cursor-pointer"> Voltar</span>
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
        const { sendPasswordResetEmail } = useAuthUser()
        return {
            sendPasswordResetEmail,
            email: '',
            dialogText: 'Verifique seu email e clique no link de redefiniçaõ de senha!',
        }
    },

    computed: {
        disableBtn() {
            if (!!this.email) return false
            else return true
        },
    },

    methods: {
        async handlePwdReset() {
            try {
                this.$q.loading.show()
                await this.sendPasswordResetEmail(this.email)
                this.$emit('showDialogInfo', this.dialogText)
            } catch (error: any) {
                this.$q.notify({
                    message: error.message,
                    type: 'negative',
                    position: 'top',
                })
            }
            this.$q.loading.hide()
        },

        isValidEmail(val: string) {
            const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
            return emailPattern.test(val) || 'Email Inválido!'
        },
    },
})
</script>

<style lang="scss" scoped>
</style>
