<template>
    <n-notification-provider>
        <n-config-provider :theme="theme">
            <main class="vh-100">
                <router-view />
            </main>
            <n-global-style />
        </n-config-provider>
    </n-notification-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NConfigProvider, darkTheme, NGlobalStyle, NNotificationProvider } from 'naive-ui';
import { mapState } from 'pinia';
import { useGlobalSettings } from './stores/useGlobalSettings';

export default defineComponent({
    name: 'App',
    components: {
        NNotificationProvider,
        NConfigProvider,
        NGlobalStyle,
    },
    computed: {
        theme() {
            return this.isDarkMode ? darkTheme : null;
        },
        ...mapState(useGlobalSettings, ['isDarkMode']),
    },
});
</script>