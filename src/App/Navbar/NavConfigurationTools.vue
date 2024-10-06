<template>
    <div class="tools">
        <n-flex justify="space-between" class="tools__row">
            <Label text="Theme" />
            <n-switch :value="isDarkMode" @update-value="toggleTheme">
                <template #checked-icon>
                    <font-awesome-icon :icon="['fas', 'moon']" />
                </template>
                <template #unchecked-icon>
                    <font-awesome-icon :icon="['fas', 'sun']" />
                </template>
            </n-switch>
        </n-flex>
    </div>
</template>

<script lang="ts">
import { getComponentName } from '@/enums/ComponentTypes';
import { mapActions, mapState } from 'pinia';
import { useGlobalSettings } from '@/stores/useGlobalSettings';

import { NButton, NSwitch, NFlex } from 'naive-ui';
import Label from '@/components/Label/Label.vue';

export default {
    components: {
        NButton,
        NSwitch,
        NFlex,
        Label,
    },
    computed: {
        ...mapState(useGlobalSettings, ['isDarkMode']),
    },
    methods: {
        getComponentName,
        ...mapActions(useGlobalSettings, ['toggleTheme']),
    },
};
</script>

<style scoped lang="scss">
.tools {
    &__row {
        margin-bottom: 1em;
    }
}
</style>
