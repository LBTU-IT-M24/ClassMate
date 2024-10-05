<template>
    <n-drawer :show="showOptions" :width="350" placement="right" @update-show="$emit('close-options')">
        <n-drawer-content title="Workspace settings">
            <n-tabs type="line" animated>
                <n-tab-pane name="tools" tab="Tools">
                    <div v-for="[type, isVisible] of widgetVisibility" :key="type">
                        <n-flex justify="space-between">
                            <div role="button" class="d-flex align-items-center" @click="updateVisibility(type, !isVisible)">
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
                <n-tab-pane name="view" tab="View"> View settings </n-tab-pane>
            </n-tabs>
        </n-drawer-content>
    </n-drawer>
</template>

<script lang="ts">
import { getComponentName } from '@/enums/ComponentTypes';
import { mapActions, mapState, mapStores } from 'pinia';
import { useWidget } from '@/stores/useWidget';
import { NDrawer, NDrawerContent, NFlex, NSwitch, NTabPane, NTabs } from 'naive-ui';
import Label from "@/components/Label/Label.vue";

export default {
    components: {
        Label,
        NFlex,
        NTabPane,
        NTabs,
        NDrawerContent,
        NDrawer,
        NSwitch,
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
    },
    methods: {
        getComponentName,
        ...mapActions(useWidget, ['updateVisibility', 'getIcon']),
    },
};
</script>

<style scoped lang="scss"></style>