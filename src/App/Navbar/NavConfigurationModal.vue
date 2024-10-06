<template>
    <n-drawer :show="showOptions" :width="350" placement="right" @update-show="$emit('close-options')">
        <n-drawer-content title="Workspace settings">
            <template #header>
                <n-flex justify="space-between">
                    Workspace settings
                    <n-button v-if="isAuthorized" text @click="signOutUser">
                        Logout &nbsp; <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
                    </n-button> </n-flex
            ></template>
            <n-tabs type="line" animated>
                <n-tab-pane name="tools" tab="Tools">
                    <div v-for="[type, isVisible] of widgetVisibility" :key="type">
                        <n-flex justify="space-between" class="tools__row">
                            <div
                                role="button"
                                class="d-flex align-items-center"
                                @click="updateVisibility(type, !isVisible)"
                            >
                                <component :is="getIcon(type)" class="me-3" />
                                <div>{{ getComponentName(type) }}</div>
                            </div>
                            <div>
                                <n-switch
                                    :value="isVisible"
                                    size="small"
                                    class="mb-3"
                                    @update-value="(event: boolean) => updateVisibility(type, event)"
                                />
                            </div>
                        </n-flex>
                    </div>
                </n-tab-pane>
                <n-tab-pane name="view" tab="View"> <NavConfigurationTools /> </n-tab-pane>
            </n-tabs>
        </n-drawer-content>
    </n-drawer>
</template>

<script lang="ts">
import { getComponentName } from '@/enums/ComponentTypes';
import { mapActions, mapState, mapStores } from 'pinia';
import { useWidget } from '@/stores/useWidget';
import { NDrawer, NDrawerContent, NFlex, NSwitch, NTabPane, NTabs, NButton } from 'naive-ui';
import Label from '@/components/Label/Label.vue';
import NavConfigurationTools from './NavConfigurationTools.vue';
import { useAuth } from '@/stores/useAuth';
import router from '@/router';

export default {
    components: {
        Label,
        NFlex,
        NTabPane,
        NTabs,
        NDrawerContent,
        NDrawer,
        NSwitch,
        NavConfigurationTools,
        NButton,
    },
    props: {
        showOptions: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        ...mapStores(useWidget),
        ...mapState(useWidget, ['widgetVisibility', 'widgetByType']),
        ...mapState(useAuth, ['isAuthorized']),
    },
    methods: {
        getComponentName,
        ...mapActions(useWidget, ['updateVisibility', 'getIcon']),
        ...mapActions(useAuth, ['signOut']),
        signOutUser() {
            this.signOut();
            router.push({ name: 'signIn' });
        },
    },
};
</script>

<style scoped lang="scss">
.tools {
    &__row {
        align-items: baseline;
    }
}
</style>
