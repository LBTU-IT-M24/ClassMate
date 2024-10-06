<template>
    <n-config-provider :theme="theme" :class="currentClass">
        <main class="vh-100">
            <router-view />
        </main>
        <n-global-style />
    </n-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NConfigProvider, darkTheme, NGlobalStyle } from 'naive-ui';
import { mapState } from 'pinia';
import { useGlobalSettings } from './stores/useGlobalSettings';

export default defineComponent({
    name: 'App',
    components: {
        NConfigProvider,
        NGlobalStyle,
    },
    computed: {
        theme() {
            // workaround for primevue quill text editor
            const element = document.querySelector('html');
            if (this.isDarkMode && !element?.classList.contains('class-mate-dark')) {
                // darkmode
                element?.classList.toggle('class-mate-dark');
            } else {
                // lightmode
                element?.classList.remove('class-mate-dark');
            }

            return this.isDarkMode ? darkTheme : null;
        },
        currentClass() {
            return this.isDarkMode ? 'class-mate-dark' : null;
        },
        ...mapState(useGlobalSettings, ['isDarkMode']),
    },
});
</script>
