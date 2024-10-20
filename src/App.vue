<template>
    <n-notification-provider>
        <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
            <main class="vh-100">
                <router-view />
            </main>
            <n-global-style />
        </n-config-provider>
    </n-notification-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NConfigProvider, darkTheme, NGlobalStyle } from 'naive-ui';
import { mapState } from 'pinia';
import { useGlobalSettings } from './stores/useGlobalSettings';
import { useThemeOverrides } from './naive-ui';
export default defineComponent({
    name: 'App',
    components: {
        NConfigProvider,
        NGlobalStyle,
    },
    computed: {
        theme() {
            return this.isDarkMode ? darkTheme : null;
        },
        themeOverrides() {
            return useThemeOverrides();
        },
        ...mapState(useGlobalSettings, ['isDarkMode']),
    },
});
</script>
