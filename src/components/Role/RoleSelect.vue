<template>
    <n-flex justify="center">
        <div class="row custom-width align-items-center vh-100">
            <div class="col-12 col-md-5 d-flex flex-column align-items-center justify-content-center">
                <n-card class="p-3">
                    <h2 class="text-center mb-3">Choose your role</h2>
                    <n-flex vertical class="w-100">
                        <n-button size="large" @click="authenticate(true)"> Teacher </n-button>
                        <n-button size="large" strong secondary @click="authenticate()"> Student </n-button>
                    </n-flex>
                </n-card>
            </div>
            <div class="col-12 col-md-7 d-flex flex-column align-items-start">
                <n-h1> Welcome to <n-gradient-text type="success"> Class Mate </n-gradient-text> ! </n-h1>
                <p>
                    Welcome to Classmate, your shared digital board for students and teachers alike. Login now to
                    collaborate seamlessly and elevate your classroom experience
                    <n-gradient-text type="info"> together! </n-gradient-text>
                </p>
            </div>
        </div>
    </n-flex>
</template>

<script lang="ts">
import { mapActions, mapStores } from 'pinia';
import { useAuth } from '@/stores/useAuth';
import router from '@/router';
import { NButton, NCard, NFlex, NGradientText, NH1 } from 'naive-ui';

export default {
    components: { NGradientText, NH1, NCard, NButton, NFlex },
    computed: {
        ...mapStores(useAuth),
    },
    methods: {
        ...mapActions(useAuth, ['signIn']),

        authenticate(isTeacher = false) {
            this.signIn(isTeacher);
            router.push({ name: 'personalBoard' });
        },
    },
};
</script>

<style scoped>
.custom-width {
    width: 100%;
}

@media (min-width: 1408px) {
    .custom-width {
        width: 50%;
    }
}
</style>
