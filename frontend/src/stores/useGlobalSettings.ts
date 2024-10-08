import type { IGlobalSettings } from '@/models/GlobalSettings/IGlobalSettings';
import { defineStore } from 'pinia';

const GLOBAL_SETTINGS = 'global-settings';

export const useGlobalSettings = defineStore('useGlobalSettings', {
    state: (): IGlobalSettings => {
        const settingString = localStorage.getItem(GLOBAL_SETTINGS);

        if (settingString) {
            return JSON.parse(settingString);
        }

        const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');

        return {
            isDarkMode: darkThemeMq.matches, // uses system default
        };
    },
    actions: {
        toggleTheme() {
            this.isDarkMode = !this.isDarkMode;
            this.updateLocalStorage();
        },
        updateLocalStorage() {
            localStorage.setItem(GLOBAL_SETTINGS, JSON.stringify(this.$state));
        },
    },
});
