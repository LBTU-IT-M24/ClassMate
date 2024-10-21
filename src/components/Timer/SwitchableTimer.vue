<template>
    <BaseWidgetDraggable
        style="min-width: 310px"
        :title="`Timer`"
        @update:width="handleWidthUpdate"
        :type="ComponentTypes.TIMER"
        @update-position="$emit('update-position')"
    >
        <template v-slot:widget>
            <n-tabs type="line" animated>
                <n-tab-pane name="timer" tab="Timer">
                    <div class="switchable-timer__item">
                        <Timer :widgetWidth="widgetWidth"/>
                    </div>
                </n-tab-pane>
                <n-tab-pane name="stopwatch" tab="Stopwatch">
                    <div class="switchable-timer__item">
                        <Stopwatch :widgetWidth="widgetWidth" />
                    </div>
                </n-tab-pane>
            </n-tabs>
        </template>
    </BaseWidgetDraggable>
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue';
import { ComponentTypes } from '@/enums/ComponentTypes';
import { NTabPane, NTabs } from 'naive-ui';
import Stopwatch from '@/components/Timer/Stopwatch.vue';
import Timer from '@/components/Timer/Timer.vue';

const widgetWidth = ref(300);
const disabledOptions = {
    isOpacityDisabled: false,
    isFontSizeDisabled: true,
    isBackgroundColorDisabled: false,
};

provide('disabledOptions', disabledOptions);
const handleWidthUpdate = (newWidth: number) => {
    widgetWidth.value = newWidth;
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