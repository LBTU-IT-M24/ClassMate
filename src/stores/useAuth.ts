import { defineStore } from 'pinia';

const AUTH_STORAGE = 'auth-storage';

export const useAuth = defineStore('auth', {
    state: () => {
        const settingString = localStorage.getItem(AUTH_STORAGE);

        if (settingString) {
            return JSON.parse(settingString);
        }

        return {
            isAuthorized: false,
            isTeacher: false,
        };
    },
    getters: {
        canEdit: (state) => state.isTeacher,
    },
    actions: {
        signIn(isTeacher = false) {
            this.isAuthorized = true;
            this.isTeacher = isTeacher;
            localStorage.setItem(AUTH_STORAGE, JSON.stringify(this.$state));
        },
        signOut() {
            this.isAuthorized = false;
            this.isTeacher = false;
            localStorage.removeItem(AUTH_STORAGE);
        },
    },
});
