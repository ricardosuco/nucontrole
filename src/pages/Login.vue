<template>
        <div v-if="$q.screen.gt.sm" class="row" style="height: 100vh">
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
            <div v-if="recoveryPwd" class="col-xs-12 col-md-5 login-bg flex items-center justify-center">
                <CardRecoveryPassword @goToLogin="goToLogin()" />
            </div>
            <div v-else class="col-xs-12 col-md-5 login-bg flex items-center justify-center">
                <q-intersection transition="fade" transition-duration="1000">
                    <component @switchCard="switchComponent($event)" @showDialogInfo="showDialogInfo($event)" :is="currentComponent"></component>
                </q-intersection>
            </div>
        </div>
        <div v-else class="row" style="height: 100vh">
            <div class="col-xs-12 col-md-7 bg-primary q-px-md">
                <div style="margin: 5vh auto">
                    <div class="text-white text-weight-medium text-center text-h3">Nucontrole</div>
                    <div class="column q-ma-lg text-white text-weight-medium text-center text-subtitle1">
                        <span>Comece a controlar suas finanças agora mesmo!</span>
                    </div>
                    <div v-if="recoveryPwd" class="flex justify-center">
                        <CardRecoveryPassword @goToLogin="goToLogin()" />
                    </div>
                    <div v-else class="flex justify-center">
                        <q-intersection transition="fade" transition-duration="1000">
                            <component @switchCard="switchComponent($event)" @showDialogInfo="showDialogInfo($event)" :is="currentComponent"></component>
                        </q-intersection>
                    </div>
                </div>
            </div>
        </div>
        <q-dialog v-model="showDialog">
            <DialogConfirmation :text="dialogText" />
        </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CardLogin from 'src/components/CardLogin.vue'
import CardResetPassword from 'src/components/CardResetPassword.vue'
import CardSignUp from 'src/components/CardSignUp.vue'
import DialogConfirmation from 'src/components/DialogConfirmation.vue'
import CardRecoveryPassword from 'src/components/CardRecoveryPassword.vue'
export default defineComponent({
    name: 'Login',
    components: {
        CardLogin,
        CardResetPassword,
        CardSignUp,
        DialogConfirmation,
        CardRecoveryPassword,
    },

    data() {
        return {
            currentComponent: 'CardLogin',
            showDialog: false,
            dialogText: '',
            recoveryPwd: false,
            resetToken: '',
        }
    },

    watch: {
        showDialog(val: boolean) {
            if (!val) this.currentComponent = 'CardLogin'
        },
    },

    methods: {
        switchComponent(event: string) {
            this.currentComponent = event
        },
        showDialogInfo(event: string) {
            this.dialogText = event
            this.showDialog = true
        },
        goToLogin() {
            this.recoveryPwd = false
            this.$router.push('/login')
        },
    },

    created() {
        let queryString = this.$route.query
        if ('recovery' in queryString && queryString.recovery === 'true') {
            this.recoveryPwd = true
        }
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