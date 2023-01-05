<template>
    <div class="row">
        <div class="col-xs-12 col-md-7 bg-primary">
            <div style="margin: 20vh auto">
                <div class="text-white text-weight-medium text-center text-h3">Nucontrole</div>
                <div class="column q-ma-xl text-white text-weight-medium text-center text-subtitle1">
                    <span>Comece a controlar suas finanças agora mesmo!</span>
                </div>
                <div class="text-center">
                    <q-img width="280px" src="images/illustration1.svg" />
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-md-5 login-bg flex items-center justify-center">
            <CardLogin :user="user" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import CardLogin from 'src/components/CardLogin.vue'

export default defineComponent({
    name: 'Login',
    components: {
        CardLogin,
    },

    data() {
        const { login, register } = useAuthUser()
        return {
            login,
            register,
            user: {
                email: '',
                password: '',
            },
            isPwd: false,
        }
    },

    methods: {
        async handleLogin() {
            let login = await this.login(this.user)
            if (login) this.$router.push('/')
        },

        validateRegister() {
            if (!!this.user.password || !!this.user.email) {
                return true
            }
        },
        isValidEmail(val: string) {
            const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
            return emailPattern.test(val) || 'Email Inválido!'
        },
        isValidPassword(val: string) {
            return val.length > 5 || 'Senha inválida!'
        },
    },
})
</script>

<style lang="scss" scoped>
.full-height {
    height: 100vh;
}

.login-bg {
    background-color: #edeaef;
}
</style>