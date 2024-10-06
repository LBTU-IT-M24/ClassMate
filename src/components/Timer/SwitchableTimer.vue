<template>
    <BaseWidgetDraggable :title="`Timer`" :type="ComponentTypes.TIMER" @update-position="$emit('update-position')">
        <template v-slot:widget>
            <n-tabs type="line" animated>
                <n-tab-pane name="timer" tab="Timer">
                    <div class="switchable-timer__item">
                        <Timer />
                    </div>
                </n-tab-pane>
                <n-tab-pane name="stopwatch" tab="Stopwatch">
                    <div class="switchable-timer__item">
                        <Stopwatch />
                    </div>
                </n-tab-pane>
            </n-tabs>
        </template>
    </BaseWidgetDraggable>
</template>

<script lang="ts">
import { ComponentTypes } from '@/enums/ComponentTypes';
import { NTabPane, NTabs } from 'naive-ui';

export default {
    components: {
        NTabPane,
        NTabs,
    },
    computed: {
        ComponentTypes() {
            return ComponentTypes;
        },
    },
};
</script>

<style scoped lang="scss">
.switchable-timer {
    min-height: 400px;
    min-width: 300px;

    &__item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>
