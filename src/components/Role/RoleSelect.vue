<template>
    <n-flex justify="center">
        <div class="row custom-width align-items-center vh-100">
            <div class="col-5 d-flex flex-column align-items-end">
                <n-flex vertical class="w-75">
                    <n-button
                        class="mb-5"
                        size="large"
                        type="primary"
                        round
                        text-color="white"
                        @click="authenticate(true)"
                    >
                        Teacher
                    </n-button>

                    <n-button size="large" ghost strong type="primary" round @click="authenticate()">
                        Student
                    </n-button>
                </n-flex>
            </div>
            <div class="col-5 d-flex flex-column align-items-start">
                <ClassmateWelcomeIcon />
                <IconClassMate />
            </div>
        </div>
    </n-flex>
</template>

<script lang="ts">
import { mapActions, mapStores } from 'pinia';
import { useAuth } from '@/stores/useAuth';
import router from '@/router';
import { NButton, NCard, NFlex, NGradientText, NH1 } from 'naive-ui';
import IconClassMate from '../icons/IconClassMate.vue';
import ClassmateWelcomeIcon from '@/components/Role/Cloud.vue';

export default {
    components: { ClassmateWelcomeIcon, NGradientText, NH1, NCard, NButton, NFlex, IconClassMate },
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
