import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', {
    state: () => ({
        isAuthorized: false,
        isTeacher: false,
    }),
    getters: {
        canEdit: (state) => state.isTeacher,
    },
    actions: {
        signIn(isTeacher = false) {
            this.isAuthorized = true;
            this.isTeacher = isTeacher;
        },
        signOut() {
            this.isAuthorized = false;
            this.isTeacher = false;
        },
    },
})