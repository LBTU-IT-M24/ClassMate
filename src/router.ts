import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/stores/useAuth';
import AuthorizationView from '@/views/AuthorizationView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'personalBoard',
            component: () => import('@/views/PersonalBoardView.vue'),
        },
        {
            path: '/sign-in',
            name: 'signIn',
            component: AuthorizationView,
        },
        {
            path: '/brainstorm-board',
            name: 'brainstormBoard',
            component: () => import('@/views/BrainstormBoardView.vue'),
        },
    ],
});

router.beforeEach(async (to, from) => {
    const authStore = useAuth();

    if (!authStore.isAuthorized && to.name !== 'signIn') {
        return { name: 'signIn' };
    }
});

export default router;
